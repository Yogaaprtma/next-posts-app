'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Navbar from '@/components/Navbar';
import { createPost } from '@/lib/api';

const IconPencil = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
  </svg>
);
const IconArrowLeft = () => (
    <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const IconTitle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

const IconContent = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    try {
      await createPost({ title, content });
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil Dipublikasikan!',
        text: 'Postingan baru Anda kini telah tayang.',
        timer: 2000,
        showConfirmButton: false,
        background: 'var(--base-100)',
        color: 'var(--foreground)',
        customClass: { popup: 'rounded-xl shadow-lg' }
      });
      router.push('/posts');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error creating post:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal membuat postingan. Silakan periksa kembali isian Anda.',
          background: 'var(--base-100)',
          color: 'var(--foreground)',
          customClass: { popup: 'rounded-xl shadow-lg' }
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <Navbar />

      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className={`relative z-10 container mx-auto px-4 py-8 transition-all duration-1000 ${
        animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>

        <div className="mb-8">
          <button
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="group inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <IconArrowLeft />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Kembali</span>
          </button>
        </div>

        <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient"></div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="p-8 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <IconPencil />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Mode Kreasi</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Saatnya menulis karya terbaikmu</p>
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Tulis Postingan Baru
              </h1>
            </div>

            <div className="p-8 lg:p-12 space-y-10">
              <div>
                <label className="label mb-3">
                  <span className="label-text text-gray-800 dark:text-gray-200 font-semibold text-base">Judul</span>
                </label>
                <div className={`
                    relative group
                    bg-gray-50 dark:bg-gray-900/50 
                    border border-gray-200 dark:border-gray-700 
                    rounded-xl shadow-sm 
                    transition-all duration-300
                    focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white/0 dark:focus-within:ring-offset-gray-800/0 focus-within:ring-purple-500 focus-within:border-blue-500
                    ${errors.title ? 'border-red-500 ring-2 ring-red-500/50' : ''}
                `}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <IconTitle />
                    </div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input bg-transparent w-full h-14 pl-14 pr-4 text-base placeholder-gray-400 dark:placeholder-gray-600 border-none focus:ring-0"
                        placeholder="Kisah Hebat Dimulai dari Judul..."
                        disabled={isSubmitting}
                    />
                </div>
                {errors.title && (
                    <span className="text-red-500 text-sm mt-2 block">{errors.title[0]}</span>
                )}
              </div>

              <div>
                <label className="label mb-3">
                  <span className="label-text text-gray-800 dark:text-gray-200 font-semibold text-base">Konten</span>
                </label>
                <div className={`
                    relative group
                    bg-gray-50 dark:bg-gray-900/50 
                    border border-gray-200 dark:border-gray-700 
                    rounded-xl shadow-sm 
                    transition-all duration-300
                    focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white/0 dark:focus-within:ring-offset-gray-800/0 focus-within:ring-purple-500 focus-within:border-blue-500
                    ${errors.content ? 'border-red-500 ring-2 ring-red-500/50' : ''}
                `}>
                    <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none">
                        <IconContent />
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="textarea bg-transparent w-full h-56 pl-14 pr-4 pt-4 pb-4 text-base placeholder-gray-400 dark:placeholder-gray-600 border-none focus:ring-0 resize-y"
                        placeholder="Tuangkan semua idemu di sini..."
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                {errors.content && (
                    <span className="text-red-500 text-sm mt-2 block">{errors.content[0]}</span>
                )}
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="btn-shiny"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan & Publikasikan'
                  )}
                </button>
              </div>
            </div>
          </form>
        </article>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .dark .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
        }
        .animate-gradient {
            background-size: 200% 200%;
            animation: gradient-shift 3s ease infinite;
        }
        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* --- Gaya Tombol Super Keren --- */
        .btn-shiny {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            font-weight: bold;
            color: white;
            background: linear-gradient(110deg, #6366f1, #a855f7, #ec4899, #a855f7, #6366f1);
            background-size: 200% 100%;
            border: none;
            border-radius: 0.75rem; /* rounded-xl */
            cursor: pointer;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            animation: gradient-shift 4s ease infinite;
        }
        .btn-shiny:disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }
        .btn-shiny::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 150%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%);
            transform: translate(-50%, -50%) scale(0);
            transition: transform 0.5s ease;
            z-index: 0;
            opacity: 0;
        }
        .btn-shiny:hover::before {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        .btn-shiny > * {
            position: relative;
            z-index: 1;
        }
        .btn-shiny:hover {
            transform: scale(1.05);
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }
      `}</style>
    </div>
  );
}