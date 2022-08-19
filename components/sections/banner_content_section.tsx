import { Component, ReactNode } from "react";

type PropData = {
    children: ReactNode
}

type StateData = {}

export default class BannerContentSection extends Component<PropData, StateData>{
    constructor(props: PropData){
        super(props)
    }

    render(): ReactNode {
        return <section
        id="about"
        className="bg-[#f3f4fe] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]"
      >
        <div className="container mx-auto">
          <div className="wow fadeInUp bg-white" data-wow-delay=".2s">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div>
                    {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    }
}