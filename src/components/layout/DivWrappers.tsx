import React, { ReactNode } from "react";
import styled from "styled-components";

interface Div {
    children?: ReactNode;
    customClass?: string;
}

const DivWrappers: React.FC<Div> = (props: Div) => {
    const {children, customClass} = props;
    return (
        <Div className={`layout-div-wrapper-${customClass}`}>{children}</Div>
    );
};



const Div = styled.div`
`;

export default DivWrappers;
