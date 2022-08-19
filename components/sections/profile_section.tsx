import { Component, ReactNode } from 'react'
import Image from 'next/image'

interface Props{
  children: ReactNode
}

class HomeSection extends Component<Props>{
  constructor(props: Props){
    super(props)
  }

    render(): ReactNode {

        return (<div id="home" className="relative overflow-hidden bg-blue-500 pt-[120px] md:pt-[130px] lg:pt-[160px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap items-center">
            {this.props.children}
          </div>
        </div>
      </div>)
    }
}

export default HomeSection