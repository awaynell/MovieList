import React, { FC } from "react";
import "./ModalTrailer.scss";
import ModalVideo from "react-modal-video";

interface ModalTrailerProps {
  youtubeID: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ModalTrailer: FC<ModalTrailerProps> = ({ youtubeID, isOpen, setIsOpen }) => {
  return <ModalVideo channel='youtube' isOpen={isOpen} videoId={youtubeID} onClose={() => setIsOpen(false)} />;
};

export default ModalTrailer;
