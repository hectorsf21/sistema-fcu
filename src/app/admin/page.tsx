"use client";
import { useState } from 'react';
import { FaDownload, FaEye, FaUsers, FaSearch, FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { Patrullero } from '@/types';

const MOCK_PATRULLEROS: Patrullero[] = Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    nombre: `Patrullero Ejemplo ${i + 1}`,
    cedula: `${10 + i}.123.456`,
    lista1x10: Array.from({ length: 10 }, (_, j) => ({
        cedula: `28.000.00${j}`,
        nombre: `Estudiante ${j + 1}`,
        carrera: "Carrera Ejemplo"
    }))
}));

export default function AdminPage() {
    const [selected, setSelected] = useState<Patrullero | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = MOCK_PATRULLEROS.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(MOCK_PATRULLEROS.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-[#fbfcfd] flex font-sans text-slate-900">

            {/* Sidebar */}
            <aside className="w-64 bg-[#021f31] text-white p-6 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-[#0274be] p-2 rounded-lg font-bold shadow-lg shadow-blue-500/20 text-sm">FCU</div>
                    <h1 className="text-lg font-bold tracking-tight">Administración</h1>
                </div>
                <nav className="flex-1 space-y-2">
                    <div className="bg-[#0274be] p-3 rounded-xl flex items-center gap-3 shadow-md cursor-pointer font-semibold text-sm">
                        <FaUsers /> Patrulleros
                    </div>
                </nav>
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mt-auto text-sm group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Inicio</span>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800">Panel de Control</h2>
                        <p className="text-sm text-slate-500">Monitoreo de registros 1x10</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200/70 rounded-xl outline-none focus:ring-2 focus:ring-[#0274be]/10 focus:border-[#0274be] transition-all shadow-sm text-sm"
                        />
                    </div>
                </header>

                {/* Tabla Section con OVERFLOW controlado */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50/80 sticky top-0 z-10 border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                                <tr>
                                    <th className="px-6 py-4">Patrullero</th>
                                    <th className="px-6 py-4 text-center">CI</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {currentItems.map(p => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-slate-700 text-sm">{p.nombre}</td>
                                        <td className="px-6 py-4 text-slate-500 text-sm text-center font-mono">{p.cedula}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-blue-50 text-[#0274be] px-2 py-1 rounded-lg text-[10px] font-bold border border-blue-100/50">
                                                {p.lista1x10.length}/10
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => setSelected(p)}
                                                    className="p-2.5 bg-white border border-slate-100 text-slate-400 rounded-lg hover:text-[#0274be] hover:border-[#0274be] transition-all"
                                                >
                                                    <FaEye size={14} />
                                                </button>
                                                <button className="p-2.5 bg-white border border-slate-100 text-slate-400 rounded-lg hover:text-green-600 hover:border-green-600 transition-all">
                                                    <FaDownload size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Paginación más pequeña */}
                <div className="flex justify-between items-center px-2">
                    <p className="text-[12px] text-slate-400 font-medium tracking-tight">
                        {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, MOCK_PATRULLEROS.length)} de {MOCK_PATRULLEROS.length}
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-[#0274be] disabled:opacity-20 transition-all"
                        >
                            <FaChevronLeft size={12} />
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-[#0274be] disabled:opacity-20 transition-all"
                        >
                            <FaChevronRight size={12} />
                        </button>
                    </div>
                </div>
            </main>

            {/* MODAL DETALLE 1x10 - MÁS PEQUEÑO Y COMPACTO */}
            {selected && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelected(null)}
                    ></div>

                    <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">

                        {/* Header del Modal */}
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Detalle 1x10</h3>
                                <p className="text-[#0274be] text-xs font-medium truncate max-w-[200px]">{selected.nombre}</p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-red-500 transition-all border border-transparent hover:border-slate-100"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>

                        {/* Lista con Scroll Interno */}
                        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-3">
                            {selected.lista1x10.map((est, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-50 rounded-xl hover:border-blue-100 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-[10px] text-slate-400 font-bold border border-slate-100">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-xs text-slate-700">{est.nombre}</p>
                                            <p className="text-[10px] text-slate-400 font-mono tracking-tighter">CI: {est.cedula}</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded border border-slate-100 uppercase tracking-tighter">
                                        {est.carrera.substring(0, 15)}...
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Footer del Modal */}
                        <div className="p-6 bg-slate-50/50 flex gap-3">
                            <button
                                onClick={() => setSelected(null)}
                                className="flex-1 py-3 text-xs bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all"
                            >
                                Cerrar
                            </button>
                            <button className="flex-1 py-3 text-xs bg-[#0274be] text-white rounded-xl font-bold hover:shadow-lg shadow-blue-200 transition-all">
                                Bajar PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Estilos adicionales para un scrollbar más fino */}
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
        </div>
    );
}