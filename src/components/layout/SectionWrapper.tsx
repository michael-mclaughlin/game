import React, { ReactNode } from "react";
import styled from "styled-components";

interface SectionProps {
    children?: ReactNode;
    customClass?: string;
}
const SectionWrapper: React.FC<SectionProps> = (props: SectionProps) => {
    const {children, customClass} = props;
    return (
        <SectionContainer className={`layout-section-wrapper ${customClass}`}>{children}</SectionContainer>
    );
}



const SectionContainer = styled.section`

`;

export default SectionWrapper;
