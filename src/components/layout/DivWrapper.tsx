import React, { ReactNode } from "react";
import styled from "styled-components";

interface DivProps {
    children?: ReactNode;
    customClass?: string;
    onClick?: () => void;
}
const DivWrapper: React.FC<DivProps> = (props: DivProps) => {
    const {children, customClass, onClick} = props;
    return (
        <DivContainer onClick={onClick} className={`layout-div-wrapper ${customClass}`}>{children}</DivContainer>
    );
}



const DivContainer = styled.div`

`;

export default DivWrapper;
