export type VerifyEmailData = {
    email: string
}

export type VerifyEmailResponse = {
    success: boolean
    message: string
    errors?: {
        [K in keyof VerifyEmailData]?: string[]
    }
    inputs?: VerifyEmailData
}