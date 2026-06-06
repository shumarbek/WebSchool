import { createHmac } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const COOKIE_NAME = 'dosov_admin_session'

export async function GET() {
  const token = cookies().get(COOKIE_NAME)?.value
  const admin = verifySession(token)
  if (!admin) return NextResponse.json({ admin: null }, { status: 401 })
  return NextResponse.json({ admin })
}

function verifySession(token) {
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  const expected = createHmac('sha256', sessionSecret()).update(payload).digest('base64url')
  if (expected !== signature) return null

  try {
    const admin = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (!admin.exp || admin.exp < Date.now()) return null
    delete admin.exp
    return admin
  } catch {
    return null
  }
}

function sessionSecret() {
  const secret = cleanSecret(process.env.ADMIN_SESSION_SECRET)
  if (!secret || secret === 'change-this-long-random-session-secret') return process.env.ADMIN_PASSWORD || 'dev-secret'
  return secret
}

function cleanSecret(value = '') {
  return value.toString().trim().replace(/^['"]|['"]$/g, '')
}
