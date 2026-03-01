"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="bg-[#0274be] text-white shadow-lg fixed w-full z-50 border-b-4 border-[#EEBF31]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Sección Izquierda: Logo UNERG y Título */}
                    <div className="flex items-center gap-3">
                        {/* Contenedor circular perfecto (blanco) */}
                        <div className="bg-white rounded-full shadow-md flex items-center justify-center w-12 h-12 shrink-0">
                            {/* La imagen mantiene su proporción 300x123 pero se ajusta al círculo */}
                            <Image
                                src="/log-unerg.jpg"
                                alt="Logo UNERG"
                                width={300}
                                height={123}
                                className="w-10 h-auto object-contain"
                            />
                        </div>
                        <Link href="/" className="font-bold text-xl tracking-wider hidden sm:block">
                            FCU <span className="font-light text-sm hidden lg:inline">| FEDERACIÓN DE CENTROS</span>
                        </Link>
                    </div>

                    {/* Enlaces Centrales (Desktop) */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="hover:text-[#EEBF31] transition font-medium">Inicio</Link>
                        <Link href="#nosotros" className="hover:text-[#EEBF31] transition font-medium">Nosotros</Link>
                        <Link href="#noticias" className="hover:text-[#EEBF31] transition font-medium">Noticias</Link>
                        <Link href="/denuncias" className="hover:text-[#EEBF31] transition font-medium text-[#EEBF31]">Denuncias</Link>
                    </div>

                    {/* Sección Derecha: Botón Ingresar y Logo FCU */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="bg-[#EEBF31] text-[#0274be] px-5 py-2 rounded-md font-bold hover:bg-yellow-400 transition-colors shadow-md flex items-center gap-2">
                            <FaUserCircle className="text-lg" /> Ingresar
                        </Link>
                        <div className="bg-white rounded-full shadow-md flex items-center justify-center w-12 h-12 shrink-0">
                            <Image
                                src="/logo-fcu.png"
                                alt="Logo FCU"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain rounded-full"
                            />
                        </div>
                    </div>

                    {/* Menú Mobile */}
                    <div className="md:hidden flex items-center gap-3">
                        <div className="bg-white rounded-full shadow-md flex items-center justify-center w-12 h-12 shrink-0">
                            <Image
                                src="/logo-fcu.png"
                                alt="Logo FCU"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain rounded-full"
                            />
                        </div>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-3xl focus:outline-none text-[#EEBF31]">
                            {isOpen ? <HiX /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar Mobile */}
            <div className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}>
                <div
                    className={`fixed right-0 top-0 h-full w-64 bg-[#0274be] shadow-2xl transform transition-transform duration-300 ease-in-out border-l-4 border-[#CB2229] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 flex flex-col space-y-6">
                        <button onClick={() => setIsOpen(false)} className="self-end text-3xl text-[#EEBF31]"><HiX /></button>
                        <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-blue-500 pb-2 hover:text-[#EEBF31]">Inicio</Link>
                        <Link href="#nosotros" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-blue-500 pb-2 hover:text-[#EEBF31]">Nosotros</Link>
                        <Link href="#noticias" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-blue-500 pb-2 hover:text-[#EEBF31]">Noticias</Link>
                        <Link href="/denuncias" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-blue-500 pb-2 text-[#EEBF31] hover:text-white">Denuncias</Link>
                        <Link href="/login" onClick={() => setIsOpen(false)} className="bg-[#EEBF31] text-[#0274be] font-bold text-center py-3 rounded-lg shadow-md mt-4">Ingresar al Sistema</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}