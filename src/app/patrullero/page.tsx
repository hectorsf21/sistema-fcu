"use client";
import { useState, ChangeEvent } from 'react';
import { FaSignOutAlt, FaFileUpload, FaUserPlus, FaFilePdf, FaTrash, FaIdCard } from 'react-icons/fa';
import Link from 'next/link';
import { Estudiante } from '@/types';

export default function PatrulleroPage() {
    const [cedulaInput, setCedulaInput] = useState<string>('');
    const [lista1x10, setLista1x10] = useState<Estudiante[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const handleAddPersona = () => {
        if (lista1x10.length >= 10) return;
        if (!cedulaInput) return;

        const nuevo: Estudiante = {
            cedula: cedulaInput,
            nombre: "Nombre del Estudiante",
            carrera: "Carrera Universitaria"
        };

        setLista1x10([...lista1x10, nuevo]);
        setCedulaInput('');
    };

    return (
        <div className="min-h-screen bg-[#f0f7ff]"> {/* Fondo azul muy claro */}
            {/* Navbar Simple sin bordes */}
            <nav className="bg-[#0274be] px-8 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="bg-[#0274be] w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">FCU</div>
                    <span className="font-bold text-white text-lg hidden md:block">Panel de Patrullero</span>
                </div>
                <Link href="/" className="flex items-center gap-2 text-white font-semibold hover:bg-red-50 px-4 py-2 rounded-xl transition">
                    <FaSignOutAlt /> Salir
                </Link>
            </nav>

            <main className="max-w-5xl mx-auto p-6 md:p-10 space-y-10">

                {/* Card 1: Subir Archivo - Sin Bordes, Con Sombra */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                        <div className="p-2 bg-blue-50 rounded-lg text-[#0274be]"><FaFileUpload /></div>
                        Carga de Reporte PDF
                    </h2>

                    <div className="relative group">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center group-hover:bg-blue-50 transition-colors">
                            {file ? (
                                <div className="flex flex-col items-center text-green-600">
                                    <FaFilePdf size={50} />
                                    <p className="mt-2 font-bold">{file.name}</p>
                                    <p className="text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            ) : (
                                <div className="text-gray-400">
                                    <p className="text-lg font-medium text-gray-600">Arrastra tu PDF o haz clic aquí</p>
                                    <p className="text-sm">Tamaño máximo permitido: 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Card 2: 1x10 - Sin Bordes, Con Sombra */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                            <div className="p-2 bg-blue-50 rounded-lg text-[#0274be]"><FaUserPlus /></div>
                            Registro de Patrulla 1x10
                        </h2>
                        <span className="bg-blue-100 text-[#0274be] px-4 py-1 rounded-full text-sm font-bold">
                            {lista1x10.length} de 10 registrados
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Ingresa número de cédula"
                                value={cedulaInput}
                                onChange={(e) => setCedulaInput(e.target.value)}
                                className="border border-gray-200 w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#0274be] transition-all"
                            />
                        </div>
                        <button
                            onClick={handleAddPersona}
                            className="bg-[#0274be] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#015a94] shadow-lg shadow-blue-200 transition-all active:scale-95"
                        >
                            Registrar Estudiante
                        </button>
                    </div>

                    <div className="overflow-hidden rounded-2xl">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-gray-500 text-sm">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">ESTUDIANTE</th>
                                    <th className="px-6 py-4 text-left font-semibold">CARRERA</th>
                                    <th className="px-6 py-4 text-right font-semibold">ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {lista1x10.map((est, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-800">{est.nombre}</p>
                                            <p className="text-sm text-gray-400">{est.cedula}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{est.carrera}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {lista1x10.length === 0 && (
                            <div className="text-center py-12 text-gray-400 italic">
                                Aún no has registrado ningún estudiante en tu 1x10.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}