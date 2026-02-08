"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaLock, FaChevronLeft } from 'react-icons/fa';

export default function Login() {
    const [cedula, setCedula] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className="min-h-screen bg-[#e6f1f8] flex items-center justify-center px-4 py-10">
            <div className="max-w-md w-full">
                {/* Botón Volver */}
                <Link href="/" className="inline-flex items-center gap-2 text-[#0274be] font-medium mb-6 hover:underline">
                    <FaChevronLeft /> Volver al inicio
                </Link>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Cabecera del Login */}
                    <div className="bg-[#0274be] p-10 text-center text-white">
                        <h2 className="text-3xl font-bold tracking-tight">Iniciar Sesión</h2>
                        <p className="text-blue-100 mt-2 opacity-80">Ingresa tus datos para acceder al panel</p>
                    </div>

                    {/* Formulario */}
                    <form className="p-10 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Cédula de Identidad</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition-all bg-gray-50"
                                    placeholder="V-12345678"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Contraseña</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition-all bg-gray-50"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Link
                            href="/patrullero"
                            className="w-full block text-center bg-[#0274be] text-white font-extrabold py-4 rounded-xl hover:bg-[#015a94] shadow-lg hover:shadow-[#0274be]/30 transition-all active:scale-95"
                        >
                            INGRESAR AL SISTEMA
                        </Link>

                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-500">
                                ¿Tienes problemas para entrar? <br />
                                <span className="text-[#0274be] font-bold cursor-pointer hover:underline">Contacta a soporte FCU</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}