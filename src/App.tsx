/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {StrictMode} from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import About from './components/About';
import Impact from './components/Impact';
import Pricing from './components/Pricing';
import Analytics from './components/Analytics';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NexaAssistant from './components/NexaAssistant';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Impact />
        <Services />
        <Process />
        <Pricing />
        <Analytics />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <NexaAssistant />
    </div>
  );
}
