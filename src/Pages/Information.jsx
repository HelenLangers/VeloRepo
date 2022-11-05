import React from 'react'
import BackEndHeader from '../Components/BackEndHeader'

function Information() {

    const pageInformation = {
        pageTitle: "Information"
      }

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      <main className='mainContainer'>
        <h2>Terms of Use</h2>
        <p className='infoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis euismod lacus. Praesent eleifend mauris ac elit convallis gravida. Nunc in malesuada massa. Aenean ut purus pretium, dictum purus sit amet, pellentesque justo. Nam vulputate facilisis dui vel mattis. Quisque lectus lectus, efficitur vel justo in, faucibus rhoncus massa. Maecenas varius porta urna non tempus.</p>

        <p className='infoText'>Mauris at pretium tortor. Proin ac dictum odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ut odio vehicula, sagittis mauris vitae, pulvinar ligula. Nulla fringilla risus neque, blandit convallis nulla faucibus sit amet. Praesent gravida venenatis ligula, vel tempor felis condimentum vel. Aliquam elementum dignissim massa, a mattis nunc maximus quis. Aliquam neque metus, lobortis vitae varius a, fermentum vel est. Ut massa augue, iaculis a massa vel, pulvinar iaculis felis. Sed fermentum in felis ac ullamcorper.</p>

        <p className='infoText'>Sed sagittis ex ut eros pulvinar cursus. Suspendisse potenti. Maecenas scelerisque lacinia tincidunt. Aenean metus ipsum, dignissim a massa ac, sollicitudin iaculis nisi. Mauris lobortis orci dui, at congue odio ultricies eget. Mauris gravida ut massa quis sodales. Integer porttitor ligula ac augue euismod condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Donec fermentum mi non nisl dictum, a dictum orci porttitor. Duis vestibulum magna nec erat facilisis tincidunt.</p>

        <p className='infoText'>In accumsan ligula non vulputate dapibus. Fusce non ultrices sapien. Etiam auctor quam ac mi cursus, ac sollicitudin odio consequat. Fusce sit amet ipsum sit amet diam ultricies dignissim. In sit amet euismod dui. Ut ullamcorper luctus nisi, sed ullamcorper augue interdum laoreet. Cras hendrerit sapien et magna gravida maximus. Donec venenatis ultricies placerat. Integer dictum dolor sed ipsum tristique, ac bibendum tortor luctus. Ut sollicitudin metus mi, sed congue lectus aliquam molestie. Nam a felis tortor. Morbi luctus turpis vel nibh porta, ac fermentum nibh pellentesque. Curabitur auctor justo vitae purus mattis, a aliquam leo aliquet. Sed suscipit luctus libero in feugiat. Proin placerat sollicitudin justo eget hendrerit. Nunc in metus scelerisque, mollis turpis eu, placerat velit.</p>

        <p className='infoText'>Vivamus sodales tortor ut nisi commodo molestie. Nunc non rutrum odio, a facilisis ipsum. Duis non ligula quis odio dignissim aliquet. Quisque pretium, mauris suscipit venenatis fermentum, odio risus porta sapien, eget commodo nunc risus ut diam. Morbi rutrum ut leo id sagittis. Aliquam laoreet sem nulla, nec vehicula mi pulvinar et. Fusce id neque eros. Etiam nulla risus, lacinia eget leo a, tincidunt condimentum arcu. Nunc bibendum maximus pretium. Vivamus metus ex, aliquet vel nunc sit amet, lacinia consequat magna. </p>
      </main>
    </>

  )
}

export default Information