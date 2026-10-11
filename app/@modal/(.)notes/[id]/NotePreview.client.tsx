// "use client";
// import { useQuery } from "@tanstack/react-query";
// import css from "./NotePreview.module.css";
// import { fetchNoteById } from "@/lib/api";
// import { useParams } from "next/navigation";
// import Modal from "@/components/Modal/Modal";
// import { useState } from "react";

// export default function NotePreviewClient() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { id } = useParams<{ id: string }>();
//   const {
//     data: note,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });
//   if (isLoading) {
//     return <p>Loading, please wait...</p>;
//   }
//   if (isError || !note) {
//     return <p>Something went wrong.</p>;
//   }
//   return (
//     <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//       <main className={css.main}>
//         <div className={css.container}>
//           <div className={css.item}>
//             <div className={css.header}>
//               <h2>{note.title}</h2>
//             </div>
//             <p className={css.tag}>{note.tag}</p>
//             <p className={css.content}>{note.content}</p>
//             <p className={css.date}> {note.createdAt}</p>
//           </div>
//         </div>
//       </main>
//     </Modal>
//   );
// }

"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back(); // Возвращает назад на страницу списка нотаток и закрывает модалку
  };

  if (isLoading) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <p>Loading, please wait...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <p>Something went wrong.</p>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <main className={css.main}>
        <button onClick={handleClose} className={css.backBtn}>
          X
        </button>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      </main>
    </Modal>
  );
}
