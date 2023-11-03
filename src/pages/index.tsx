import { invoke } from "@tauri-apps/api/tauri"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useCallback, useState } from "react"

import { Card } from "@/components/Card"
import { CardButton } from "@/components/CardButton"
import { useGlobalShortcut } from "@/hooks/tauri/shortcuts"
import Link from "next/link";

const Home: NextPage = () => {
    const [buttonDesc, setButtonDesc] = useState<string>(
        "Waiting to be clicked. This calls 'on_button_clicked' from Rust.",
    )

    const [buttonDesc2, setButtonDesc2] = useState<string>(
        "Waiting to be clicked. This calls 'on_button_clicked_two' from Rust.",
    )

    const onButtonClick = () => {
        invoke<string>("on_button_clicked")
            .then((value) => {
                setButtonDesc(value)
            })
            .catch(() => {
                setButtonDesc("Failed to invoke Rust command 'on_button_clicked'")
            })
    }


    const onButtonClickTwo = (input: number) => {
        invoke<string>("on_button_clicked_two", {
            input: input
        })
            .then((value) => {
                setButtonDesc2(value)
            })
            .catch(() => {
                setButtonDesc2("Failed to invoke Rust command 'on_button_clicked_two'")
            })
    }

    const shortcutHandler = useCallback(() => {
        console.log("Ctrl+P was pressed!")
    }, [])
    useGlobalShortcut("CommandOrControl+P", shortcutHandler)

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="flex flex-1 flex-col items-center justify-center py-8">
                <h1 className="m-0 text-center text-6xl">
                    Welcome to{" "}
                    <a
                        href="https://nextjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline focus:underline active:underline"
                    >
                        Next.js!
                    </a>
                </h1>


                <div className="flex max-w-3xl flex-wrap items-center justify-center">
                    {/*hint_open_new_page*/}
                    <Link href="/detail">
                        {/*hint_create_button*/}
                        <CardButton
                            onClick={() => {
                            }}
                            title="Go To Next Page"
                            description=""
                        />
                    </Link>
                </div>
            </main>

            <footer className="flex flex-1 flex-grow-0 items-center justify-center border-t border-gray-200 py-4">
                <div>
                    <a
                        href="https://tauri.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-grow items-center justify-center p-4"
                    >
                        Powered by{" "}
                        <span className="ml-2 h-6">
              <Image
                  src="/tauri_logo_light.svg"
                  alt="Vercel Logo"
                  height={24}
                  width={78}
              />
            </span>
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Home
