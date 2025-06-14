import { Bulge } from "@/components/bulge";
import { Header } from "@/components/header";
import { WorkWrapper } from "@/components/workSection/workWrapper";

export function WorkSection({ }) {
    return (
        <section className="section section__3 third darkGradient overflow-hidden px-paddingX py-paddingY">
            <Bulge type="Light" />
            <Header color="Light"></Header>
            <WorkWrapper />
        </section>
    );
}
