"use client";
import { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="bg-[#0274be] text-white shadow-lg fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="font-bold text-xl tracking-wider">
                            FCU <span className="font-light text-sm hidden md:inline">| FEDERACIÓN</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="hover:bg-blue-700 px-3 py-2 rounded-md transition">Inicio</Link>
                            <Link href="/login" className="bg-white text-[#0274be] px-4 py-2 rounded-md font-bold hover:bg-gray-100 transition flex items-center gap-2">
                                <FaUserCircle /> Ingresar
                            </Link>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl focus:outline-none">
                            {isOpen ? <HiX /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar Mobile */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}>
                <div
                    className={`fixed right-0 top-0 h-full w-64 bg-[#0274be] shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 flex flex-col space-y-6">
                        <button onClick={() => setIsOpen(false)} className="self-end text-3xl"><HiX /></button>
                        <Link href="/" onClick={() => setIsOpen(false)} className="text-lg border-b border-blue-400 pb-2">Inicio</Link>
                        <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg border-b border-blue-400 pb-2">Ingresar</Link>
                        <Link href="/admin" onClick={() => setIsOpen(false)} className="text-lg border-b border-blue-400 pb-2">Admin Panel</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}