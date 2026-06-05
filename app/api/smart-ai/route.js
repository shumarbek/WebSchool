import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function serverSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
}

export async function POST(request) {
  try {
    const { question } = await request.json()
    if (!question?.trim()) {
      return NextResponse.json({ answer: 'Savol yozing.' }, { status: 400 })
    }

    const supabase = serverSupabase()
    const { data: aiSettings } = await supabase.from('ai_settings').select('*').limit(1).maybeSingle()
    const context = await buildPlatformContext(supabase, aiSettings?.platform_context)

    if (!aiSettings?.is_enabled || !aiSettings?.api_key) {
      return NextResponse.json({ answer: localAnswer(question, context) })
    }

    const prompt = [
      "Siz DOSOV maktab platformasining Smart AI yordamchisisiz.",
      "Faqat platforma, maktab, dars jadvali, hodimlar, yangiliklar, yutuqlar, kutubxona, faoliyat va sozlamalar doirasida javob bering.",
      "Javoblarni o'zbek tilida, aniq, qisqa va foydali yozing.",
      "Agar data ichida aniq javob topilmasa, buni ochiq ayting va eng yaqin foydali yo'nalishni bering.",
      "",
      "PLATFORMA DATA:",
      context,
      "",
      `USER SAVOLI: ${question}`,
    ].join('\n')

    const model = aiSettings.model || 'gemini-1.5-flash'
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(aiSettings.api_key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.35, maxOutputTokens: 900 },
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Gemini error:', text)
      return NextResponse.json({ answer: localAnswer(question, context) })
    }

    const data = await response.json()
    const answer = data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join('\n').trim()
    return NextResponse.json({ answer: answer || localAnswer(question, context) })
  } catch (error) {
    console.error('Smart AI route error:', error)
    return NextResponse.json({ answer: 'Hozircha AI javob berishda muammo yuz berdi. Keyinroq qayta urinib ko\'ring.' }, { status: 500 })
  }
}

async function buildPlatformContext(supabase, manualContext = '') {
  const [
    settings,
    staff,
    schedule,
    news,
    achievements,
    activities,
    books,
    milestones,
  ] = await Promise.all([
    supabase.from('platform_settings').select('*').limit(1).maybeSingle(),
    supabase.from('staff').select('full_name,role,subject,position,work_type,phone,email,qualification_level,experience_years,is_active').eq('is_active', true).limit(80),
    supabase.from('schedule').select('grade,tur,day,lesson_number,subject,room,start_time,end_time,staff(full_name)').eq('is_active', true).order('grade').order('tur').order('lesson_number').limit(140),
    supabase.from('news').select('title,category,content,published_at,event_start_at,responsible_person,is_published').eq('is_published', true).order('published_at', { ascending: false }).limit(25),
    supabase.from('achievements').select('title,category,stage,certificate_type,participants,teacher_names,award_date,description,is_published').eq('is_published', true).order('award_date', { ascending: false }).limit(25),
    supabase.from('activities').select('title,category,date,location,participants_count,teacher_names,description,is_published').eq('is_published', true).order('date', { ascending: false }).limit(25),
    supabase.from('library_books').select('title,author,category,grade,publisher,year,description,is_published').eq('is_published', true).order('title').limit(40),
    supabase.from('milestones').select('year,month,title,description,is_director,director_name').order('year').limit(30),
  ])

  const lines = []
  if (manualContext) lines.push(`Qo'lda kiritilgan ma'lumot: ${manualContext}`)
  if (settings.data) lines.push(`Aloqa: tel=${settings.data.phone || '-'}, email=${settings.data.email || '-'}, manzil=${settings.data.address || '-'}`)

  lines.push(`Hodimlar: ${compact(staff.data?.map((item) => `${item.full_name || item.work_type} (${item.role}${item.subject ? `, ${item.subject}` : ''}${item.phone ? `, ${item.phone}` : ''})`))}`)
  lines.push(`Dars jadvali: ${compact(schedule.data?.map((item) => `${item.grade}-${item.tur} ${item.day} ${item.lesson_number}-dars ${item.start_time?.slice(0, 5) || ''}-${item.end_time?.slice(0, 5) || ''} ${item.subject}, ${item.staff?.full_name || 'ustoz kiritilmagan'}, xona ${item.room || '-'}`))}`)
  lines.push(`Yangiliklar: ${compact(news.data?.map((item) => `${item.title} [${item.category}] ${item.event_start_at ? `tadbir vaqti ${item.event_start_at}` : ''} ${item.responsible_person ? `mas'ul ${item.responsible_person}` : ''}`))}`)
  lines.push(`Yutuqlar: ${compact(achievements.data?.map((item) => `${item.title} [${item.category}] ${item.stage || item.certificate_type || ''} ${JSON.stringify(item.participants || [])} ustozlar: ${(item.teacher_names || []).join(', ')}`))}`)
  lines.push(`Faoliyatlar: ${compact(activities.data?.map((item) => `${item.title} [${item.category}] sana ${item.date || '-'} joy ${item.location || '-'} ustozlar ${(item.teacher_names || []).join(', ')}`))}`)
  lines.push(`Kutubxona: ${compact(books.data?.map((item) => `${item.title}, ${item.author || 'muallif yoq'}, ${item.category}, ${item.grade ? `${item.grade}-sinf` : ''}`))}`)
  lines.push(`Tarix: ${compact(milestones.data?.map((item) => `${item.year}/${item.month || ''} ${item.title}${item.is_director ? ` direktor ${item.director_name || ''}` : ''}`))}`)

  return lines.join('\n')
}

function compact(items = []) {
  return items.filter(Boolean).join(' | ').slice(0, 5500) || 'ma\'lumot yo\'q'
}

function localAnswer(question, context) {
  const lower = question.toLowerCase()
  const matching = context
    .split('\n')
    .filter((line) => lower.split(/\s+/).some((word) => word.length > 3 && line.toLowerCase().includes(word)))
    .slice(0, 4)

  if (matching.length) {
    return `Gemini API sozlanmagan yoki vaqtincha javob bermadi. Platforma ma'lumotlaridan topilgan yaqin javob:\n\n${matching.join('\n')}`
  }

  return "Gemini API sozlanmagan yoki vaqtincha javob bermadi. Admin paneldagi Smart AI bo'limida API key/model kiriting; shundan keyin men platforma ma'lumotlari asosida to'liqroq javob beraman."
}
