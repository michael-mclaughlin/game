import React, { ReactElement } from "react";
import styled from "styled-components";

interface Section {
    children: ReactElement;
    customClass?: string;
}
const SectionWrapper: React.FC<Section> = (props: Section) => {
    const {children, customClass} = props;
    return (
        <Section className={`layout-section-wrapper ${customClass}`}>{children}</Section>
    );
}



const Section = styled.section`

`

export default SectionWrapper;
