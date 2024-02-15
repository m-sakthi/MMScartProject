import { useRef, useEffect } from "react";

const Modal = ({ children, onCloseHandler, show }) => {
  const modalRef = useRef();

  useEffect(() => {
    const clickHandler = (e) => {
      if (!modalRef.current) return;

      if (!modalRef.current.contains(e.target)) {
        onCloseHandler();
      }
    }

    document.addEventListener('click', clickHandler, true);
    return () => {
      document.removeEventListener('click', clickHandler);
    }
  }, []);

  return (
    <div
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      id="modal-profile"
      className="modal fade show"
      aria-labelledby="modal-profile"
      style={{ display: show ? 'block' : 'none' }}>
      <div
        ref={modalRef}
        className="modal-dialog modal-dialog-centered modal-fullscreen-xl-down">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal