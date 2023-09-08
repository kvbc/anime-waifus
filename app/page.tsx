"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

class Tag {
    public isNsfw: boolean;
    public name: string;

    constructor(name: string, isNsfw: boolean) {
        this.name = name;
        this.isNsfw = isNsfw;
    }

    public id(): string {
        return this.name + this.isNsfw;
    }
}

enum ProviderType {
    WaifuIm = "waifu.im",
    WaifuPics = "waifu.pics",
    NekosBest = "nekos.best",
    Catboys = "catboys.com",
}

class Provider {
    public type: ProviderType;
    public tags: Tag[];

    constructor(type: ProviderType, tags: Tag[]) {
        this.type = type;
        this.tags = tags;
    }

    public getTag(id: string): Tag | null {
        return this.tags.find((tag) => tag.id() == id) ?? null;
    }
}

const providers = {
    [ProviderType.WaifuIm]: new Provider(ProviderType.WaifuIm, [
        // SFW
        new Tag("waifu", false),
        new Tag("maid", false),
        new Tag("marin-kitagawa", false),
        new Tag("mori-calliope", false),
        new Tag("raiden-shogun", false),
        new Tag("oppai", false),
        new Tag("selfies", false),
        new Tag("uniform", false),
        // NSFW
        new Tag("ero", true),
        new Tag("ass", true),
        new Tag("hentai", true),
        new Tag("milf", true),
        new Tag("oral", true),
        new Tag("paizuri", true),
        new Tag("ecchi", true),
    ]),
    [ProviderType.WaifuPics]: new Provider(ProviderType.WaifuPics, [
        // SFW
        new Tag("waifu", false),
        new Tag("neko", false),
        new Tag("shinobu", false),
        new Tag("megumin", false),
        new Tag("bully", false),
        new Tag("cuddle", false),
        new Tag("cry", false),
        new Tag("hug", false),
        new Tag("awoo", false),
        new Tag("kiss", false),
        new Tag("lick", false),
        new Tag("pat", false),
        new Tag("smug", false),
        new Tag("bonk", false),
        new Tag("yeet", false),
        new Tag("blush", false),
        new Tag("smile", false),
        new Tag("wave", false),
        new Tag("highfive", false),
        new Tag("handhold", false),
        new Tag("nom", false),
        new Tag("bite", false),
        new Tag("glomp", false),
        new Tag("slap", false),
        new Tag("kill", false),
        new Tag("kick", false),
        new Tag("happy", false),
        new Tag("wink", false),
        new Tag("poke", false),
        new Tag("dance", false),
        new Tag("cringe", false),
        // NSFW
        new Tag("waifu", true),
        new Tag("neko", true),
        new Tag("trap", true),
        new Tag("blowjob", true),
    ]),
    [ProviderType.NekosBest]: new Provider(ProviderType.NekosBest, [
        // SFW
        new Tag("highfive", false),
        new Tag("happy", false),
        new Tag("sleep", false),
        new Tag("handhold", false),
        new Tag("laugh", false),
        new Tag("bite", false),
        new Tag("poke", false),
        new Tag("tickle", false),
        new Tag("kiss", false),
        new Tag("wave", false),
        new Tag("thumbsup", false),
        new Tag("stare", false),
        new Tag("cuddle", false),
        new Tag("smile", false),
        new Tag("lurk", false),
        new Tag("baka", false),
        new Tag("blush", false),
        new Tag("nom", false),
        new Tag("peck", false),
        new Tag("handshake", false),
        new Tag("think", false),
        new Tag("pout", false),
        new Tag("facepalm", false),
        new Tag("yawn", false),
        new Tag("wink", false),
        new Tag("shoot", false),
        new Tag("smug", false),
        new Tag("nope", false),
        new Tag("cry", false),
        new Tag("pat", false),
        new Tag("nod", false),
        new Tag("punch", false),
        new Tag("dance", false),
        new Tag("feed", false),
        new Tag("shrug", false),
        new Tag("bored", false),
        new Tag("kick", false),
        new Tag("hug", false),
        new Tag("yeet", false),
        new Tag("slap", false),
        new Tag("neko", false),
        new Tag("husbando", false),
        new Tag("kitsune", false),
        new Tag("waifu", false),
    ]),
    [ProviderType.Catboys]: new Provider(ProviderType.Catboys, [
        // SFW
        new Tag("img", false),
        new Tag("baka", false),
        new Tag("8ball", false),
        new Tag("dice", false),
    ]),
};

export default function Home() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [providerType, setProviderType] = useState<ProviderType>(
        ProviderType.WaifuPics
    );
    const [tag, setTag] = useState<Tag | null>(null);

    const provider = providers[providerType];

    function onGetButtonClicked() {
        if (tag != null) {
            setImageUrl("");

            let url = "";
            let getImgUrlFunc: (data: Object) => string;
            switch (providerType) {
                case ProviderType.WaifuPics:
                    let category = tag.isNsfw ? "nsfw" : "sfw";
                    url = `https://api.waifu.pics/${category}/${tag.name}`;
                    getImgUrlFunc = function (data: any) {
                        return data.url;
                    };
                    break;
                case ProviderType.WaifuIm:
                    url = `https://api.waifu.im/search?included_tags=${tag.name}`;
                    getImgUrlFunc = function (data: any) {
                        return data.images[0].url;
                    };
                    break;
                case ProviderType.NekosBest:
                    url = `https://nekos.best/api/v2/${tag.name}?amount=1`;
                    getImgUrlFunc = function (data: any) {
                        return data.results[0].url;
                    };
                    break;
                case ProviderType.Catboys:
                    url = `https://catboys.com/api/${tag.name}`;
                    getImgUrlFunc = function (data: any) {
                        return data.url;
                    };
                    break;
            }

            fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("res error: " + res.status);
                    }
                })
                .then((data) => {
                    setImageUrl(getImgUrlFunc(data) ?? "");
                })
                .catch((err) => {
                    throw new Error("error:" + err);
                });
        }
    }

    function onHideButtonClicked() {
        setImageUrl(null);
    }

    useEffect(() => {
        setTag(provider.tags[0]);
    }, [providerType]);

    return (
        <main className="min-h-screen p-12 flex items-center flex-col gap-4">
            <h1 className="text-4xl font-bold h-min">Anime Waifus</h1>
            <p className="flex w-60 items-center">
                <text className="w-1/3 text-left">Provider &nbsp;</text>
                <select
                    className="w-2/3 p-2 rounded-xl"
                    onChange={(e) =>
                        setProviderType(e.target.value as ProviderType)
                    }
                    value={providerType}
                >
                    {Object.values(ProviderType).map((prov) => (
                        <option key={prov} value={prov}>
                            {prov}
                        </option>
                    ))}
                </select>
            </p>
            <p className="flex w-60 items-center">
                <text className="w-1/3 text-left">Tag &nbsp;</text>
                <select
                    className="w-2/3 rounded-xl p-2"
                    onChange={(e) => setTag(provider.getTag(e.target.value))}
                    value={tag ? tag.id() : ""}
                >
                    {provider.tags.map((tag) => (
                        <option
                            className={tag.isNsfw ? "text-red-500" : ""}
                            key={tag.id()}
                            value={tag.id()}
                        >
                            {tag.name}
                        </option>
                    ))}
                </select>
            </p>
            <div className="flex gap-2">
                <button
                    className="p-5 bg-slate-500 text-slate-100 rounded-3xl w-32 h-6 flex items-center justify-center"
                    onClick={onGetButtonClicked}
                >
                    Get
                </button>
                <button
                    className="p-5 bg-red-500 text-slate-100 rounded-3xl w-32 h-6 flex items-center justify-center"
                    onClick={onHideButtonClicked}
                >
                    Hide
                </button>
            </div>
            {imageUrl == ""
                ? "Loading ..."
                : imageUrl != null && (
                      <Image src={imageUrl} alt="" width={1000} height={1000} />
                  )}
        </main>
    );
}
