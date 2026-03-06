"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaSearch, FaDownload, FaPlus, FaTimes, FaUpload } from 'react-icons/fa';

// Datos de prueba
const NOMBRES = ['Marcos Pérez', 'Fabián González', 'Luis Fernández', 'María Sánchez', 'Andrea Gómez', 'Carlos Rodríguez', 'Sofía Castillo', 'Javier López', 'Ana Martínez', 'Diego Herrera'];
const ESTADOS = ['Pendiente', 'En Revisión', 'Aprobado'];

const MOCK_PROYECTOS = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    autor: NOMBRES[i % NOMBRES.length],
    carrera: ['Ingeniería Informática', 'Medicina', 'Odontología', 'Agronomía', 'Derecho'][i % 5],
    estado: ESTADOS[i % 3],
    fecha: `2024-0${1 + (i % 9)}-${10 + (i % 15)}`,
}));

export default function SubirProyectosPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 8;

    // Filtrado
    const filteredProyectos = MOCK_PROYECTOS.filter(
        (p) =>
            p.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.carrera.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginación
    const totalPages = Math.ceil(filteredProyectos.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProyectos.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar Simple */}
            <header className="bg-[#021f31] text-white p-4 shadow-md flex justify-between items-center px-6 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#CB2229] p-2 rounded-lg font-bold shadow-lg text-sm">PROY</div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">Gestión de Proyectos</h1>
                </div>
                <Link href="/admin" className="flex items-center gap-2 text-slate-300 hover:text-[#EEBF31] transition-colors text-sm font-medium">
                    <FaArrowLeft /> <span className="hidden sm:inline">Volver al Panel</span>
                </Link>
            </header>

            <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
                {/* Acciones Superiores */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full md:w-auto bg-[#CB2229] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                    >
                        <FaPlus /> Subir Nuevo Proyecto
                    </button>

                    <div className="relative w-full md:w-96">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar por autor o carrera..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CB2229] focus:border-transparent outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Tabla de Proyectos */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Autor del Proyecto</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Carrera / Área</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Fecha</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Archivo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentItems.length > 0 ? (
                                    currentItems.map((proyecto) => (
                                        <tr key={proyecto.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-800">{proyecto.autor}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <span className="bg-red-50 text-[#CB2229] px-3 py-1 rounded-full text-xs font-medium border border-red-100">
                                                    {proyecto.carrera}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${proyecto.estado === 'Aprobado' ? 'bg-green-50 text-green-700 border-green-200' :
                                                        proyecto.estado === 'En Revisión' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                            'bg-blue-50 text-blue-700 border-blue-200'
                                                    }`}>
                                                    {proyecto.estado}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-500 text-sm font-mono">{proyecto.fecha}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="p-2 text-[#0274be] hover:bg-blue-50 rounded-lg hover:text-blue-800 transition-colors tooltip" title="Descargar Proyecto">
                                                    <FaDownload size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                            No se encontraron proyectos que coincidan con la búsqueda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredProyectos.length)}</span> de <span className="font-medium">{filteredProyectos.length}</span> resultados
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal Subir Proyecto */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn">

                        <div className="bg-[#CB2229] p-6 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-2"><FaUpload /> Subir Nuevo Proyecto</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white transition">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Proyecto subido con éxito (Simulación)"); }}>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Autor</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CB2229] outline-none"
                                    placeholder="Ej. María Sánchez"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Carrera / Área</label>
                                <select required className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CB2229] outline-none">
                                    <option value="">Seleccione una carrera...</option>
                                    <option value="Medicina">Medicina</option>
                                    <option value="Ingeniería Informática">Ingeniería Informática</option>
                                    <option value="Odontología">Odontología</option>
                                    <option value="Agronomía">Agronomía</option>
                                    <option value="Leyes">Leyes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Descripción Corta del Proyecto</label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CB2229] outline-none resize-none"
                                    placeholder="Describe brevemente el objetivo del proyecto..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Adjuntar Archivo (PDF, DOCX, RAR)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#CB2229] hover:bg-red-50 transition cursor-pointer relative">
                                    <FaUpload className="text-3xl mb-2 text-gray-400" />
                                    <span className="text-sm font-medium">Haz clic aquí para seleccionar un archivo</span>
                                    <input type="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
                                    Cancelar
                                </button>
                                <button type="submit" className="flex-1 px-4 py-3 bg-[#CB2229] text-white font-bold rounded-xl hover:bg-red-700 shadow-md transition">
                                    Subir Proyecto
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
