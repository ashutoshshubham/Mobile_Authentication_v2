import React, { useState } from 'react'
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import OtpInput from 'otp-input-react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from '../firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const Authentication = () => {

    const [otp, setOtp] = useState("")
    const [ph, setPh] = useState("")
    const [loading, setLoading] = useState(false)
    const [showOTP, setShowOTP] = useState(false)
    const [user, setUser] = useState(null)

    const onCaptchaVerifier = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // ...
                    onSignup()
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                    // ...
                }
            }, auth);
        }
    }

    const onSignup = () => {
        setLoading(true)
        onCaptchaVerifier()


        const appVerifier = window.recaptchaVerifier

        const formatPh = '+' + ph

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                setLoading(false)
                setShowOTP(true)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            });
    }

    const onOTPVerify = () => {
        setLoading(true)
        window.confirmationResult.confirm(otp)
        .then(async(result) => {
            console.log(result)
            setUser(result.user)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)

        });
    }


    return (
        <div>
            <section className='bg-success flex items-center justify-center h-screen'>
                <div>

                    <div id="recaptcha-container"></div>

                    {
                        user ? (

                            <h2 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                                Login Success
                            </h2>

                        ) : (

                            <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                                <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>
                                    Welcome
                                </h1>

                                {
                                    showOTP ? (

                                        <>
                                            <div className=''>
                                                <BsFillShieldLockFill size={30} className='text-white' />
                                            </div>
                                            <label htmlFor="otp">
                                                Enter OTP
                                            </label>
                                            <OtpInput
                                                OTPLength={6}
                                                value={otp}
                                                onChange={setOtp}
                                                otpType='number'
                                                disabled={false}
                                                autoFocus
                                            ></OtpInput>

                                            <button
                                            onClick={onOTPVerify}>
                                                {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
                                                <span>
                                                    Verify OTP
                                                </span>
                                            </button>

                                        </>

                                    ) :
                                        <>
                                            <div className=''>
                                                <BsTelephoneFill size={30} className='text-white' />
                                            </div>
                                            <label htmlFor="">
                                                Verify Phone number
                                            </label>
                                            {/* <OtpInput
                                OTPLength={6}
                                value={otp}
                                onChange={setOtp}
                                otpType='number'
                                disabled={false}
                                autoFocus
                            ></OtpInput> */}

                                            <PhoneInput country={"in"} value={ph} onChange={setPh} />

                                            <button 
                                            onClick={onSignup}>
                                                {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
                                                <span>
                                                    Send OTP
                                                </span>
                                            </button>

                                        </>

                                }






                            </div>

                        )

                    }




                </div>
            </section>
        </div>
    )
}

export default Authentication