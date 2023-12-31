import './globals.css'
import type { Metadata } from 'next'
import ServerHeader from './_components/_sc/ServerHeader'

// 1일
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Git Storage File',
  description: 'Generated by codingjwp',
  icons: [{ rel: 'x-icon', url: './favicon.ico' }],
  manifest: 'manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <ServerHeader />
          {children}
        </div>
      </body>
    </html>
  )
}
