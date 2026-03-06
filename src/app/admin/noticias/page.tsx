"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaSearch, FaPlus, FaTimes, FaCamera, FaSave, FaNewspaper, FaEye, FaEdit, FaTrashAlt, FaImage } from 'react-icons/fa';

// Datos de prueba para Noticias
const MOCK_NOTICIAS = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    titulo: `FCU organiza nueva jornada de carnetización ${i + 1}`,
    fecha: `2024-03-${10 + (i % 20)}`,
    estado: ['Publicado', 'Borrador'][i % 2],
    descripcion: `La Federación de Centros Universitarios anuncia que a partir de este lunes se llevará a cabo una jornada especial de carnetización para todos los estudiantes regulares e ingresos recientes...`
}));

export default function NoticiasAdminPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'NUEVO' | 'VER' | 'EDITAR' | null>(null);
    const [selectedNoticia, setSelectedNoticia] = useState<any>(null);
    const itemsPerPage = 6;

    // Form data state
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        estado: 'Publicado'
    });

    // Filtrado
    const filteredNoticias = MOCK_NOTICIAS.filter(
        (n) => n.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginación
    const totalPages = Math.ceil(filteredNoticias.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredNoticias.slice(indexOfFirstItem, indexOfLastItem);

    const openModal = (mode: 'NUEVO' | 'VER' | 'EDITAR', noticia: any = null) => {
        setModalMode(mode);
        setSelectedNoticia(noticia);

        if (mode === 'NUEVO') {
            setFormData({ titulo: '', descripcion: '', estado: 'Publicado' });
        } else if (noticia) {
            setFormData({
                titulo: noticia.titulo,
                descripcion: noticia.descripcion,
                estado: noticia.estado
            });
        }

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMode(null);
        setSelectedNoticia(null);
    };

    const handleDelete = (id: number) => {
        if (confirm("¿Está seguro de que desea eliminar esta noticia? Esta acción no se puede deshacer.")) {
            alert(`Noticia ${id} eliminada (Simulación)`);
            // Lógica de eliminación...
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar */}
            <header className="bg-[#021f31] text-white p-4 shadow-md flex justify-between items-center px-6 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#EEBF31] text-gray-900 p-2 rounded-lg font-bold shadow-lg text-sm">NOT</div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">Gestión de Noticias</h1>
                </div>
                <Link href="/admin" className="flex items-center gap-2 text-slate-300 hover:text-[#EEBF31] transition-colors text-sm font-medium">
                    <FaArrowLeft /> <span className="hidden sm:inline">Volver al Panel</span>
                </Link>
            </header>

            <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">

                {/* Acciones Superiores */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <button
                        onClick={() => openModal('NUEVO')}
                        className="w-full md:w-auto bg-[#0274be] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                    >
                        <FaPlus /> Redactar Nueva Noticia
                    </button>

                    <div className="relative w-full md:w-96">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar noticia por título..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Tabla/Grid de Noticias */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Portada</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Título de la Noticia</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Fecha</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentItems.length > 0 ? (
                                    currentItems.map((noticia) => (
                                        <tr key={noticia.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="h-12 w-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border border-gray-300 overflow-hidden">
                                                    <FaImage size={20} />
                                                    {/* <img src={noticia.foto} alt="Portada" className="w-full h-full object-cover" /> */}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-800 line-clamp-1">{noticia.titulo}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1 mt-1 max-w-sm">{noticia.descripcion}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-500 text-sm font-mono">{noticia.fecha}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-block ${noticia.estado === 'Publicado' ? 'bg-green-50 text-green-700 border-green-200' :
                                                        'bg-gray-100 text-gray-600 border-gray-300'
                                                    }`}>
                                                    {noticia.estado}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button
                                                        onClick={() => openModal('VER', noticia)}
                                                        className="p-2 text-[#0274be] hover:bg-blue-50 rounded-lg transition-colors tooltip" title="Ver"
                                                    >
                                                        <FaEye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => openModal('EDITAR', noticia)}
                                                        className="p-2 text-[#EEBF31] hover:bg-yellow-50 rounded-lg transition-colors tooltip" title="Editar"
                                                    >
                                                        <FaEdit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(noticia.id)}
                                                        className="p-2 text-[#CB2229] hover:bg-red-50 rounded-lg transition-colors tooltip" title="Eliminar"
                                                    >
                                                        <FaTrashAlt size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            <FaNewspaper className="mx-auto text-4xl text-gray-300 mb-3" />
                                            <p className="text-lg font-medium">No se encontraron noticias</p>
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
                                Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredNoticias.length)}</span> de <span className="font-medium">{filteredNoticias.length}</span> noticias
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

            {/* MODAL NUEVA/VER/EDITAR NOTICIA */}
            {isModalOpen && modalMode && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">

                        <div className={`p-6 text-white flex justify-between items-center ${modalMode === 'VER' ? 'bg-[#0274be]' :
                                modalMode === 'EDITAR' ? 'bg-[#EEBF31] text-gray-900' : 'bg-[#0274be]'
                            }`}>
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                {modalMode === 'VER' && <><FaEye /> Previsualizar Noticia</>}
                                {modalMode === 'EDITAR' && <><FaEdit /> Editar Noticia</>}
                                {modalMode === 'NUEVO' && <><FaPlus /> Redactar Nueva Noticia</>}
                            </h3>
                            <button onClick={closeModal} className="hover:opacity-80 transition">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Acción guardada exitosamente (Simulación)"); closeModal(); }}>

                                {/* Foto de Portada */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Foto de Portada</label>
                                    {modalMode === 'VER' ? (
                                        <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                                            <FaImage size={48} />
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-[#0274be] hover:bg-blue-50 transition cursor-pointer relative bg-gray-50">
                                            <FaCamera className="text-5xl mb-3 text-gray-400" />
                                            <span className="text-base font-bold text-gray-700">Haz clic aquí para subir una imagen</span>
                                            <span className="text-xs mt-1">Formatos soportados: JPG, PNG, WEBP (Recomendado 16:9)</span>
                                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                                        </div>
                                    )}
                                </div>

                                {/* Título */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Título de la Noticia</label>
                                    <input
                                        type="text"
                                        required
                                        readOnly={modalMode === 'VER'}
                                        value={formData.titulo}
                                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl border ${modalMode === 'VER' ? 'bg-gray-50 border-transparent font-bold text-lg' : 'bg-white border-gray-300 focus:ring-2 focus:ring-[#0274be] outline-none shadow-sm'}`}
                                        placeholder="Escribe un título llamativo..."
                                    />
                                </div>

                                {/* Estado */}
                                {modalMode !== 'VER' && (
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Estado de Publicación</label>
                                        <select
                                            value={formData.estado}
                                            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                            className="w-full md:w-1/2 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0274be] outline-none shadow-sm"
                                        >
                                            <option value="Publicado">Publicado (Visible a todos)</option>
                                            <option value="Borrador">Borrador (Oculto temporalmente)</option>
                                        </select>
                                    </div>
                                )}

                                {/* Contenido / Descripción */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Contenido de la Noticia</label>
                                    {modalMode === 'VER' ? (
                                        <div className="p-4 bg-gray-50 rounded-xl text-gray-800 whitespace-pre-wrap min-h-[150px]">
                                            {formData.descripcion}
                                        </div>
                                    ) : (
                                        <textarea
                                            required
                                            rows={8}
                                            value={formData.descripcion}
                                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0274be] outline-none resize-none shadow-sm"
                                            placeholder="Redacta todo el contenido detallado de la noticia aquí..."
                                        ></textarea>
                                    )}
                                </div>

                                {/* Botones Inferiores (Oculto en VER) */}
                                {modalMode !== 'VER' && (
                                    <div className="pt-4 flex gap-3 border-t border-gray-100">
                                        <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
                                            Cancelar
                                        </button>
                                        <button type="submit" className="flex-1 px-4 py-3 bg-[#0274be] text-white font-bold rounded-xl hover:bg-blue-700 shadow-md transition flex items-center justify-center gap-2">
                                            <FaSave /> {modalMode === 'NUEVO' ? 'Publicar Noticia' : 'Guardar Cambios'}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
