import React from 'react'
import Link from 'next/link'

export default function Guest() {
  return (
    <main className="container py-4 mx-auto text-center">
      <h3 className="fs-3 font-bold">Guest Homepage</h3>
      <div className="d-flex justify-content-center mt-3">
        <Link href={"/login"}>
          <span className="mt-4 px-4 py-1 rounded bg-primary text-white">
            Sign In
          </span>
        </Link>
      </div>
    </main>
  )
}
