"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type Users = {
    id: number;
    name: string;
    expense: number;
    age: number;
    avatar: string;
};

export default function MainContainer() {
    const [expenses, setExpenses] = useState<Users[] | null>(null);
    const [name, setName] = useState("");
    const [age, setAge] = useState('')
    const [expense, setExpense] = useState("");
    const [img, setImg] = useState<any | null>();

    const GetExpenses = async () => {
        const data = await fetch("http://localhost:3006/expenses");
        const res = await data.json();
        setExpenses(res);
    };

    useEffect(() => {
        GetExpenses();
    }, []);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('expense', expense)
        formData.append('age', age)
        formData.append('avatar', img[0])
        console.log(formData, 'formdata')
        const resp = await fetch('http://localhost:3006/expenses', {
            method: "POST",
            body: formData
        })
        if (resp.status === 201) {
            await GetExpenses()
        }
    }

    const DeleteExpense = async (id: number) => {
        const resp = await fetch(`http://localhost:3006/expenses/${id}`, {
            method: "DELETE"

        })
        if (resp.status === 200) {
            await GetExpenses()
        }
    }

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-4">
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="name"
                        className="w-full max-w-[350px] border-2 border-black"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="age"
                        className="w-full max-w-[350px] border-2 border-black"
                        value={age}
                        required
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="expense"
                        className="w-full max-w-[350px] border-2 border-black"
                        value={expense}
                        required
                        onChange={(e) => setExpense(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={(e) => setImg(e.target.files)}
                    />
                    <button>Create expense</button>
                </form>

                <div className="">
                    {expenses?.length ? (
                        expenses?.map((item) => (
                            <div
                                className="w-full p-4 border-y-2 border-amber-500"
                                key={item.id} >
                                <h1 className="text-3xl text-red-500">{item.name}</h1>
                                <Image src={item.avatar}
                                    className="w-[500px] h-[200px] object-cover"
                                    alt={"ravi yleoba"}
                                    width={100}
                                    height={100}
                                    priority
                                />
                                <button onClick={() => DeleteExpense(item.id)} className="p-4 bg-red-500 text-white font-bold" >Delete</button>
                            </div>
                        ))
                    ) : (
                        <h1>...Loading</h1>
                    )}
                </div>
            </div>
        </>
    );
}
