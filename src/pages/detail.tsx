import { invoke } from "@tauri-apps/api/tauri"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

import { Card } from "@/components/Card"
import { CardButton } from "@/components/CardButton"
import { useGlobalShortcut } from "@/hooks/tauri/shortcuts"
import Link from "next/link";

interface PlaceHolderItem {
    userId: number;
    id: number;
    title: string;
}

const Home: NextPage = () => {
    const [msg, setMsg] = useState<string>(
        "no-data",
    )
    const [items, setItems] = useState<PlaceHolderItem[]>([]);

    async function fetchData() {
        try {
            const data: PlaceHolderItem[] = await invoke<PlaceHolderItem[]>("fetch_data", {})
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        // hint_show_loading_indicator
        setMsg("loading");
        fetchData().then((data) => {
            if (data != null) {
                setMsg("total: " + data.length.toString());
                // hint_show_webservice_result_on_list
                setItems(data)
            }
        }).catch((error) => {
            setMsg("error");
        });
    }, []);
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="flex flex-1 flex-col items-center justify-center py-8">
                <h1 className="m-0 text-center text-6xl">
                    Hello
                </h1>
                <Link href="/">
                    <CardButton
                        onClick={() => {

                        }}
                        title="Go Back"
                        description=""
                    />
                </Link>
                <CardButton
                    onClick={() => {

                    }}
                    title="Total Items"
                    description={msg}
                />
                <br/>
                <br/>
                <br/>
                <div>
                    {items.map((item) => (
                        <div>
                            {/*hint_button_on_list*/}
                            <a href="#"
                                onClick={() => {
                                    // hint_show_detail_item_on_alert
                                    alert(item.title)
                                }}
                                key={item.id}
                            >
                                {item.title} - {item.userId} - {item.id}
                            </a>
                        </div>
                    ))}
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
