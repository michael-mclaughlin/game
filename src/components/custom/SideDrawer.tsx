import React, { ReactNode } from "react";
import '../../styles/drawer.css';
import DivWrapper from "../layout/DivWrapper.tsx";

interface SideDrawerProps {
    children?: ReactNode;
    customClass?: string;
    isOpen: boolean;
    onClose: () => void;
}
const SideDrawer: React.FC<SideDrawerProps> = (props: SideDrawerProps) => {
    const { children, isOpen, onClose, customClass } = props;

    return (
        <DivWrapper customClass="secondary-side-drawer-container">
            {isOpen && <DivWrapper customClass="overlay" onClick={onClose}></DivWrapper>}
            <DivWrapper customClass={`secondary-side-drawer drawer ${customClass} ${isOpen ? 'open' : 'closed'}`}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <DivWrapper>{children}</DivWrapper>
            </DivWrapper>
        </DivWrapper>
    );
}


export default SideDrawer;
