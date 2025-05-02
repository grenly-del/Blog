const {z} = require('zod')

const RequestUser = z.object({
    name: z.string()
      .min(4, 'Nama harus lebih dari 4 karakter')
      .max(20, 'Nama harus kurang dari 20 karakter')
      ,
  
    email: z.string()
      .email('Format bukan email !!'),
  
    password: z.string()
      .min(8, 'Password harus lebih dari 8 karakter')
      .refine((password) => /[a-zA-Z]/.test(password), {
        message: 'Password harus mengandung minimal 1 huruf',
      })
      .refine((password) => /\d/.test(password), {
        message: 'Password harus mengandung minimal 1 angka',
      })
})

module.exports = {RequestUser}