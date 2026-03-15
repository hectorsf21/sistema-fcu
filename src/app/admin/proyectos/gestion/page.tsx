"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaSearch, FaDownload, FaEdit, FaCheck } from 'react-icons/fa';

// Datos de prueba
const NOMBRES = ['Marcos Pérez', 'Fabián González', 'Luis Fernández', 'María Sánchez', 'Andrea Gómez', 'Carlos Rodríguez', 'Sofía Castillo', 'Javier López', 'Ana Martínez', 'Diego Herrera'];
const ESTADOS = ['Pendiente', 'En Revisión', 'Aprobado'];

const INITIAL_MOCK = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    autor: NOMBRES[i % NOMBRES.length],
    carrera: ['Ingeniería Informática', 'Medicina', 'Odontología', 'Agronomía', 'Derecho'][i % 5],
    estado: ESTADOS[i % 3],
    fecha: `2024-0${1 + (i % 9)}-${10 + (i % 15)}`,
}));

export default function GestionProyectosPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [proyectos, setProyectos] = useState(INITIAL_MOCK);
    const itemsPerPage = 8;

    // Filtrado
    const filteredProyectos = proyectos.filter(
        (p) =>
            p.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.carrera.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginación
    const totalPages = Math.ceil(filteredProyectos.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProyectos.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar estado
    const handleStatusChange = (id: number, newStatus: string) => {
        setProyectos(prev => prev.map(p =>
            p.id === id ? { ...p, estado: newStatus } : p
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <header className="bg-[#021f31] text-white p-4 shadow-md flex justify-between items-center px-6 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#CB2229] p-2 rounded-lg font-bold shadow-lg text-sm">PROY-ADMIN</div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">Gestión General de Proyectos</h1>
                </div>
                <Link href="/admin" className="flex items-center gap-2 text-slate-300 hover:text-[#EEBF31] transition-colors text-sm font-medium">
                    <FaArrowLeft /> <span className="hidden sm:inline">Volver al Panel</span>
                </Link>
            </header>

            <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                        <h2 className="text-lg font-bold text-gray-800">Panel de Administrador</h2>
                        <p className="text-sm text-gray-500">Aquí puedes visualizar y cambiar el estatus de todos los proyectos subidos por los usuarios.</p>
                    </div>

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

                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Autor del Proyecto</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Carrera / Área</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Cambiar Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Fecha</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Acción</th>
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
                                                <select
                                                    value={proyecto.estado}
                                                    onChange={(e) => handleStatusChange(proyecto.id, e.target.value)}
                                                    className={`px-3 py-2 rounded-xl text-sm font-bold border outline-none cursor-pointer ${proyecto.estado === 'Aprobado' ? 'bg-green-50 text-green-700 border-green-200 focus:ring-green-500' :
                                                        proyecto.estado === 'En Revisión' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 focus:ring-yellow-500' :
                                                            'bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500'
                                                        }`}
                                                >
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="En Revisión">En Revisión</option>
                                                    <option value="Aprobado">Aprobado</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-500 text-sm font-mono">{proyecto.fecha}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="p-2 text-[#0274be] hover:bg-blue-50 rounded-lg hover:text-blue-800 transition-colors tooltip" title="Descargar PDF">
                                                    <FaDownload size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                            No se encontraron proyectos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

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
        </div>
    );
}
