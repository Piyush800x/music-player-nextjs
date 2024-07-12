'use client';
import React, { useState } from "react";

interface FormData {
    artist: string,
    album: string,
    musicName: string, 
    file: File | null;
}

export default function Add() {

    const [formData, setFormData] = useState<FormData>({
        artist: "",
        album: "",
        musicName: "",
        file: null
    });
    const [btn, setBtn] = useState<string>("Submit")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                file: e.target.files[0],
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBtn("Uploading...")
        if (!formData.file) {
            return;
        }
        const arrayBuffer = await formData.file.arrayBuffer();
        const metadata = {
            artist: formData.artist,
            album: formData.album,
            musicName: formData.musicName,
            filename: formData.file.name
        };

        try {
            console.log(`PAge.tsx: ${formData}`)
            const response = await fetch(`/api/addmusic`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(metadata),
                },
                body: arrayBuffer,
            });
            console.log(`Page Response: ${response.status}`);
            setBtn("Submit")
        }
        catch (error) {
            console.error(`Error > ${error}`);
            setBtn("Submit")
        }
        
    }

    return (
        <div className="flex items-center flex-col">
            <h1>Add Music</h1>
            <div>
                <form onSubmit={handleSubmit} method="POST">
                    {/* Artist Name */}
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist Name</label>
                    {/* <select id="artist" name="artist" value={formData.artist} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                        <option value="">Select an artist</option>
                        <option value="The Weeknd">The Weeknd</option>
                        <option value="Childish Gambino">Childish Gambino</option>
                    </select> */}
                    <input id="artist" name="artist" value={formData.artist} onChange={handleChange} placeholder="Enter artist name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />

                    {/* Album Name */}
                    <label htmlFor="album" className="block text-sm font-medium text-gray-700">Album Name</label>
                    {/* <select id="album" name="album" value={formData.album} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                        <option value="">Select an album</option>
                        <option value="Starboy">Starboy</option>
                        <option value="My Dear Meloncholy">My Dear Meloncholy</option>
                    </select> */}
                    <input id="album" name="album" value={formData.album} onChange={handleChange} placeholder="Enter album name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />

                    {/* Song Name */}
                    <label htmlFor="musicName" className="block text-sm font-medium text-gray-700">Song Name</label>
                    <input id="musicName" name="musicName" value={formData.musicName} onChange={handleChange} placeholder="Enter song name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    {/* Upload Music */}
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload music file</label>
                    <input id="file" name="file" type="file" accept=".flac" onChange={handleFileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required/>

                    <button name="submitBtn" type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">{btn}</button>
                </form>
            </div>
        </div>
    )
}