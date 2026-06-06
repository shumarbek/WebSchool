import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

const COOKIE_NAME = 'dosov_admin_session'

export async function POST(request) {
  const { email, password } = await request.json()
  const adminEmail = cleanSecret(process.env.ADMIN_EMAIL)
  const adminPassword = cleanSecret(process.env.ADMIN_PASSWORD)

  if (!adminEmail || !adminPassword || adminPassword === 'change-this-admin-password') {
    return NextResponse.json({ error: 'Admin login .env.local faylida sozlanmagan.' }, { status: 500 })
  }

  if (!safeEqual(cleanSecret(email), adminEmail) || !safeEqual(cleanSecret(password), adminPassword)) {
    return NextResponse.json({ error: 'Login yoki parol xato' }, { status: 401 })
  }

  const admin = {
    email: adminEmail,
    full_name: process.env.ADMIN_FULL_NAME || 'Admin',
    role: 'admin',
  }
  const token = signSession(admin)
  const response = NextResponse.json({ admin })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return response
}

function signSession(admin) {
  const payload = Buffer.from(JSON.stringify({ ...admin, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url')
  const signature = createHmac('sha256', sessionSecret()).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

function safeEqual(a, b) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

function sessionSecret() {
  const secret = cleanSecret(process.env.ADMIN_SESSION_SECRET)
  if (!secret || secret === 'change-this-long-random-session-secret') return process.env.ADMIN_PASSWORD || 'dev-secret'
  return secret
}

function cleanSecret(value = '') {
  return value.toString().trim().replace(/^['"]|['"]$/g, '')
}
