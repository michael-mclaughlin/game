import React, { ReactElement } from "react";
import styled from "styled-components";

interface Div {
    children: ReactElement;
    customClass: string;
}

const DivWrapper: React.FC<Div> = (props: Div) => {
    const {children, customClass} = props;
    return (
        <Div className={`layout-div-wrapper-${customClass}`}>{children}</Div>
    );
}



const Div = styled.div`
border: 10px solid blue;
padding: 2rem;
`

export default DivWrapper;
