"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaSearch, FaDownload, FaPlus, FaTimes, FaCalendarCheck, FaUpload } from 'react-icons/fa';

// Datos de prueba para Plan de Trabajo - Simulando solo los del usuario actual
const MOCK_PLANES = [
    { id: 1, autor: 'Mi Usuario', carrera: 'Ingeniería Informática', estado: 'Aprobado', fecha: '2024-03-15' },
    { id: 2, autor: 'Mi Usuario', carrera: 'Ingeniería Informática', estado: 'En Revisión', fecha: '2024-03-10' },
    { id: 3, autor: 'Mi Usuario', carrera: 'Ingeniería Informática', estado: 'Pendiente', fecha: '2024-03-05' },
];

export default function PlanTrabajoPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 7;

    // Filtrado
    const filteredPlanes = MOCK_PLANES.filter(
        (p) =>
            p.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.carrera.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginación
    const totalPages = Math.ceil(filteredPlanes.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPlanes.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar Simple */}
            <header className="bg-[#021f31] text-white p-4 shadow-md flex justify-between items-center px-6 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#EEBF31] text-gray-900 p-2 rounded-lg font-bold shadow-lg text-sm drop-shadow">PLAN</div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">Mi Plan de Trabajo</h1>
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
                        className="w-full md:w-auto bg-[#EEBF31] hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                    >
                        <FaPlus /> Subir Nuevo Plan
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
                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EEBF31] focus:border-transparent outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Tabla de Plan de Trabajo */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Autor del Plan</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Carrera / Área</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Fecha Sometido</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Archivo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentItems.length > 0 ? (
                                    currentItems.map((plan) => (
                                        <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-800 flex items-center gap-2">
                                                <FaCalendarCheck className="text-[#EEBF31]" />
                                                {plan.autor}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium border border-yellow-100">
                                                    {plan.carrera}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${plan.estado === 'Aprobado' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    plan.estado === 'En Revisión' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                        'bg-blue-50 text-blue-700 border-blue-200'
                                                    }`}>
                                                    {plan.estado}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-500 text-sm font-mono">{plan.fecha}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="p-2 text-[#0274be] hover:bg-blue-50 rounded-lg hover:text-blue-800 transition-colors tooltip" title="Descargar Plan de Trabajo">
                                                    <FaDownload size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                            No se encontraron planes de trabajo asociados a la búsqueda.
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
                                Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredPlanes.length)}</span> de <span className="font-medium">{filteredPlanes.length}</span> resultados
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

            {/* Modal Subir Plan de Trabajo */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn">

                        <div className="bg-[#EEBF31] p-6 text-gray-900 flex justify-between items-center">
                            <h3 className="text-xl font-extrabold flex items-center gap-2"><FaUpload /> Registrar Plan</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-800 hover:text-red-600 transition">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Plan de Trabajo guardado (Simulación)"); }}>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Título del Plan Operativo</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EEBF31] outline-none"
                                    placeholder="Ej. Plan de Asesorías Trimestre III"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Responsable / Coordinador</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EEBF31] outline-none"
                                    placeholder="Ej. Ing. Carlos Pérez"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Fecha de Inicio</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EEBF31] outline-none text-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Estado Previsto</label>
                                    <select required className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EEBF31] outline-none text-gray-600">
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Activo">Activo</option>
                                    </select>
                                </div>
                            </div>

                            {/* Botón de Adjuntar Archivo Obligatorio */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Adjuntar Archivo de Planificación (PDF, XLS)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#EEBF31] hover:bg-yellow-50 transition cursor-pointer relative">
                                    <FaUpload className="text-3xl mb-2 text-gray-400 group-hover:text-[#EEBF31]" />
                                    <span className="text-sm font-medium">Haz clic aquí para seleccionar un archivo</span>
                                    <input type="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
                                    Cancelar
                                </button>
                                <button type="submit" className="flex-1 px-4 py-3 bg-[#EEBF31] text-gray-900 font-bold rounded-xl hover:bg-yellow-500 shadow-md transition">
                                    Guardar Plan
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
