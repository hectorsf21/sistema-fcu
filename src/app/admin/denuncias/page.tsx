"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaSearch, FaBullhorn, FaEye, FaFilter } from 'react-icons/fa';

// Datos de prueba para Denuncias
const NOMBRES = ['Marcos Pérez', 'Fabián González', 'Luis Fernández', 'María Sánchez', 'Andrea Gómez', 'Carlos Rodríguez', 'Sofía Castillo', 'Javier López', 'Ana Martínez', 'Diego Herrera'];
const ESTADOS = ['Pendiente', 'En Revisión', 'Aprobado'];
const CATEGORIAS = ['Infraestructura', 'Académico', 'Administrativo', 'Seguridad', 'Servicios Estudiantiles'];

const MOCK_DENUNCIAS = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    denunciante: NOMBRES[i % NOMBRES.length],
    categoria: CATEGORIAS[i % CATEGORIAS.length],
    estado: ESTADOS[i % 3],
    fecha: `2024-0${1 + (i % 9)}-${10 + (i % 20)}`,
    descripcion: `Reporte número ${i + 1} detallando diversas incidencias registradas por el estudiante en su facultad.`
}));

export default function DenunciasAdminPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filtrado Combinado (Nombre, Categoría, Estado)
    const filteredDenuncias = MOCK_DENUNCIAS.filter((d) => {
        const matchName = d.denunciante.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = filterCategoria ? d.categoria === filterCategoria : true;
        const matchState = filterEstado ? d.estado === filterEstado : true;

        // Si hay un término de búsqueda general, buscar también en categoría o estado (por si el usuario lo escribe directo)
        const matchGeneral = searchTerm === '' || matchName ||
            d.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.estado.toLowerCase().includes(searchTerm.toLowerCase());

        return matchGeneral && matchCategory && matchState;
    });

    // Paginación
    const totalPages = Math.ceil(filteredDenuncias.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDenuncias.slice(indexOfFirstItem, indexOfLastItem);

    const resetFilters = () => {
        setSearchTerm('');
        setFilterCategoria('');
        setFilterEstado('');
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar Simple */}
            <header className="bg-[#021f31] text-white p-4 shadow-md flex justify-between items-center px-6 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#0274be] p-2 rounded-lg font-bold shadow-lg text-sm">DEN</div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">Gestión de Denuncias</h1>
                </div>
                <Link href="/admin" className="flex items-center gap-2 text-slate-300 hover:text-[#EEBF31] transition-colors text-sm font-medium">
                    <FaArrowLeft /> <span className="hidden sm:inline">Volver al Panel</span>
                </Link>
            </header>

            <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">

                {/* Zona de Búsqueda y Filtros */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-end">

                        {/* Buscador General */}
                        <div className="relative w-full md:flex-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Buscar</label>
                            <span className="absolute bottom-3 left-4 flex items-center text-gray-400">
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                placeholder="Nombre del denunciante, categoría, etc..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition-all text-sm"
                            />
                        </div>

                        {/* Filtro por Categoría */}
                        <div className="w-full md:w-64">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Categoría</label>
                            <select
                                value={filterCategoria}
                                onChange={(e) => {
                                    setFilterCategoria(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0274be] outline-none text-sm text-gray-700"
                            >
                                <option value="">Todas las categorías</option>
                                {CATEGORIAS.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro por Estado */}
                        <div className="w-full md:w-56">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estado</label>
                            <select
                                value={filterEstado}
                                onChange={(e) => {
                                    setFilterEstado(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0274be] outline-none text-sm text-gray-700"
                            >
                                <option value="">Todos los estados</option>
                                {ESTADOS.map(est => (
                                    <option key={est} value={est}>{est}</option>
                                ))}
                            </select>
                        </div>

                        {/* Botón Limpiar */}
                        <button
                            onClick={resetFilters}
                            className="w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2"
                        >
                            <FaFilter /> Limpiar
                        </button>

                    </div>
                </div>

                {/* Tabla de Denuncias */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#0274be]/5 border-b border-[#0274be]/10">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-[#0274be] uppercase tracking-wider">Denunciante</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#0274be] uppercase tracking-wider">Categoría</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#0274be] uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#0274be] uppercase tracking-wider text-center">Fecha</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#0274be] uppercase tracking-wider text-center">Detalles</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentItems.length > 0 ? (
                                    currentItems.map((denuncia) => (
                                        <tr key={denuncia.id} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-800 flex items-center gap-3">
                                                <div className="bg-gray-100 p-2 rounded-full text-[#CB2229]">
                                                    <FaBullhorn size={14} />
                                                </div>
                                                {denuncia.denunciante}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-sm">{denuncia.categoria}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-block ${denuncia.estado === 'Aprobado' ? 'bg-green-50 text-green-700 border-green-200' :
                                                        denuncia.estado === 'En Revisión' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                            'bg-blue-50 text-[#0274be] border-blue-200'
                                                    }`}>
                                                    {denuncia.estado}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-500 text-sm font-mono">{denuncia.fecha}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="p-2 text-[#0274be] hover:bg-blue-100 rounded-lg hover:text-[#014875] transition-colors tooltip" title="Ver Detalles Completos">
                                                    <FaEye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            <FaSearch className="mx-auto text-4xl text-gray-300 mb-3" />
                                            <p className="text-lg font-medium">No se encontraron denuncias</p>
                                            <p className="text-sm">Ajuste los filtros de búsqueda para ver más resultados.</p>
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
                                Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredDenuncias.length)}</span> de <span className="font-medium">{filteredDenuncias.length}</span> resultados
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-blue-50 disabled:opacity-50 transition"
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-blue-50 disabled:opacity-50 transition"
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
