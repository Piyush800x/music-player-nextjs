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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="flex items-center flex-col">
            <h1>Add Music</h1>
            <div>
                <form action="">
                    {/* Artist Name */}
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist Name</label>
                    <select id="artist" name="artist" value={formData.artist} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select an artist</option>
                        <option value="Artist 1">The Weeknd</option>
                        <option value="Artist 2">Childish Gambino</option>
                    </select>
                    {/* Album Name */}
                    <label htmlFor="album" className="block text-sm font-medium text-gray-700">Album Name</label>
                    <select id="album" name="album" value={formData.album} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select an album</option>
                        <option value="Album 1">Starboy</option>
                        <option value="Album 2">My Dear Meloncholy</option>
                    </select>
                    {/* Song Name */}
                    <label htmlFor="musicName" className="block text-sm font-medium text-gray-700">Song Name</label>
                    <input id="musicName" name="musicName" value={formData.musicName} onChange={handleChange} placeholder="Enter song name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                    {/* Upload Music */}
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload music file</label>
                    <input id="file" name="file" type="file" accept=".flac" onChange={handleFileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
                </form>
            </div>
        </div>
    )
}