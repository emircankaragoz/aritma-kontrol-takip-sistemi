import React from 'react'
import { hashSync, genSaltSync } from "bcryptjs";

export default function Deneme() {

// hash password
const salt = genSaltSync(12)
const hashedPassword = hashSync("123", salt)
console.log(hashedPassword)
  return (
    <div>
        Deneme
    </div>
  )
}
