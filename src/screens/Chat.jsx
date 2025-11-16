import { useEffect } from 'react';

const Chat = () => {
  useEffect(() => {
    // Live stats update function
    const updateLiveStats = () => {
      const time = new Date().toLocaleTimeString();
      const timeElement = document.getElementById('liveTime');
      if (timeElement) timeElement.textContent = time;
      
      // Randomize stats for demo
      const cpu = Math.floor(Math.random() * 20) + 75;
      const ram = Math.floor(Math.random() * 15) + 60;
      const net = Math.floor(Math.random() * 100) + 200;
      
      const liveCpu = document.getElementById('liveCpu');
      const liveRam = document.getElementById('liveRam');
      const liveNet = document.getElementById('liveNet');
      const cpuValue = document.getElementById('cpuValue');
      const ramValue = document.getElementById('ramValue');
      const netValue = document.getElementById('netValue');
      
      if (liveCpu) liveCpu.textContent = cpu + '%';
      if (liveRam) liveRam.textContent = ram + '%';
      if (liveNet) liveNet.textContent = net + 'MB/s';
      if (cpuValue) cpuValue.textContent = cpu + '%';
      if (ramValue) ramValue.textContent = ram + '%';
      if (netValue) netValue.textContent = net + 'MB/s';
      
      // Update progress bars
      const cpuBar = document.querySelector('.bg-gradient-to-r.from-green-500.to-green-300');
      const ramBar = document.querySelector('.bg-gradient-to-r.from-blue-500.to-blue-300');
      const netBar = document.querySelector('.bg-gradient-to-r.from-red-500.to-red-300');
      
      if (cpuBar) cpuBar.style.width = cpu + '%';
      if (ramBar) ramBar.style.width = ram + '%';
      if (netBar) netBar.style.width = Math.min(100, (net / 3)) + '%';
    };

    // Initial call
    updateLiveStats();
    
    // Set up interval
    const intervalId = setInterval(updateLiveStats, 2000);
    
    // Input suggestions functionality
    const input = document.getElementById('commandInput');
    const suggestions = document.getElementById('suggestions');
    
    const handleInputFocus = () => {
      if (suggestions) suggestions.style.display = 'block';
    };
    
    const handleInputBlur = () => {
      // Delay hiding to allow for clicks on suggestions
      setTimeout(() => {
        if (suggestions) suggestions.style.display = 'none';
      }, 200);
    };
    
    if (input) {
      input.addEventListener('focus', handleInputFocus);
      input.addEventListener('blur', handleInputBlur);
    }
    
    // Suggestion click handlers
    const suggestionItems = document.querySelectorAll('#suggestions div.cursor-pointer');
    suggestionItems.forEach(item => {
      item.addEventListener('click', () => {
        const command = item.textContent.split(' - ')[0].trim();
        if (input) {
          input.value = command;
          input.focus();
        }
      });
    });

    // Clear button functionality
    const clearButton = document.querySelector('button:contains("Clear")');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        if (input) input.value = '';
        input?.focus();
      });
    }

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      if (input) {
        input.removeEventListener('focus', handleInputFocus);
        input.removeEventListener('blur', handleInputBlur);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden">

      {/* 🖥️ ULTIMATE HACKER THEME */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Main Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-green-900/10 to-black" />
        
        {/* UNSTOPPABLE BINARY RAIN - Multiple Layers */}
        <div className="absolute left-0 top-0 w-1/4 h-full">
          <div className="absolute inset-0 binary-column" style={{left: '5%'}}></div>
          <div className="absolute inset-0 binary-column" style={{left: '20%'}}></div>
          <div className="absolute inset-0 binary-column" style={{left: '35%'}}></div>
          <div className="absolute inset-0 binary-column" style={{left: '50%'}}></div>
          <div className="absolute inset-0 binary-column" style={{left: '65%'}}></div>
          <div className="absolute inset-0 binary-column" style={{left: '80%'}}></div>
          <div className="absolute inset-0 binary-column" style={{left: '95%'}}></div>
        </div>
        
        {/* Radar Scan */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 radar-scan" />
        
        {/* Satellite Dots */}
        <div className="satellite-dots"></div>
        
        {/* Data Packets Flying */}
        <div className="data-packets"></div>
        
        {/* Hacking Terminal Popups */}
        <div className="hacking-popups"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 hacker-grid opacity-40" />
        
        {/* Scan Lines */}
        <div className="absolute inset-0 scan-lines" />
        
        {/* Glitch Effect */}
        <div className="glitch-overlay"></div>

      </div>

      {/* --- CHAT UI CONTENT --- */}
      <div className="relative z-20 flex flex-col h-full">

        {/* ENHANCED HEADER WITH LIVE STATS */}
        <div className="border-b border-green-500/30 bg-black/80 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold flex items-center gap-2 font-mono">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-500">ROOT@OKZY</span>
              <span className="text-white">:~$</span>
            </h1>
            
            {/* Live Stats */}
            <div className="flex gap-4 text-xs font-mono">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span>CPU: <span className="text-green-400" id="liveCpu">87%</span></span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                <span>RAM: <span className="text-blue-400" id="liveRam">64%</span></span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                <span>NET: <span className="text-red-400" id="liveNet">245MB/s</span></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm font-mono">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded border border-green-500/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>ENCRYPTED</span>
            </div>
            
            {/* Time Display */}
            <div className="text-green-400 font-mono text-sm">
              <span id="liveTime">23:59:45</span>
            </div>
            
            <div className="relative group">
              <button className="p-2 hover:bg-green-500/20 rounded-lg transition-all duration-200 border border-green-500/30 hover:border-green-500/50 font-mono text-xs">
                SYS_CTRL
              </button>

              <div className="absolute right-0 mt-2 bg-black/95 backdrop-blur-xl shadow-2xl rounded-lg p-2 hidden group-hover:block w-48 border border-green-500/30 font-mono text-xs">
                <div className="cursor-pointer px-3 py-2 hover:bg-green-500/20 rounded transition-colors flex justify-between">
                  <span> ADMIN_PANEL</span>
                  <span className="text-green-400">[ALT+A]</span>
                </div>
                <div className="cursor-pointer px-3 py-2 hover:bg-green-500/20 rounded transition-colors flex justify-between">
                  <span> SYSTEM_LOG</span>
                  <span className="text-green-400">[ALT+L]</span>
                </div>
                <div className="cursor-pointer px-3 py-2 hover:bg-green-500/20 rounded transition-colors flex justify-between">
                  <span> SECURITY</span>
                  <span className="text-green-400">[ALT+S]</span>
                </div>
                <div className="border-t border-green-500/20 my-1"></div>
                <div className="cursor-pointer px-3 py-2 hover:bg-red-500/20 rounded flex items-center gap-2 transition-colors text-red-400">
                  <span>_</span>
                  SHUTDOWN
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex">
          {/* Left Sidebar - Enhanced Binary Rain Area */}
          <div className="w-1/4 relative border-r border-green-500/20 bg-black/40">
            {/* System Status Display */}
            <div className="p-4 font-mono text-xs space-y-3 border-b border-green-500/20">
              <div className="text-green-500 flex justify-between items-center">
                <span>[ SYSTEM_MONITOR ]</span>
                <span className="text-green-400 animate-pulse">LIVE</span>
              </div>
              
              {/* Animated Progress Bars */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-green-300">
                    <span>CPU_LOAD</span>
                    <span id="cpuValue">87%</span>
                  </div>
                  <div className="w-full bg-black border border-green-500/30 rounded h-2 mt-1">
                    <div className="bg-gradient-to-r from-green-500 to-green-300 h-full rounded animate-pulse" style={{width: '87%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-blue-300">
                    <span>MEMORY</span>
                    <span id="ramValue">64%</span>
                  </div>
                  <div className="w-full bg-black border border-blue-500/30 rounded h-2 mt-1">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-300 h-full rounded" style={{width: '64%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-red-300">
                    <span>NETWORK</span>
                    <span id="netValue">245MB/s</span>
                  </div>
                  <div className="w-full bg-black border border-red-500/30 rounded h-2 mt-1">
                    <div className="bg-gradient-to-r from-red-500 to-red-300 h-full rounded animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connection Log */}
            <div className="p-4 font-mono text-xs space-y-1">
              <div className="text-green-500">[ ACTIVE_CONNECTIONS ]</div>
              <div className="space-y-1 mt-2">
                <div className="flex justify-between text-green-400">
                  <span> USER_001</span>
                  <span className="text-green-500 animate-pulse">ONLINE</span>
                </div>
                <div className="flex justify-between text-blue-400">
                  <span> AI_CORE</span>
                  <span className="text-blue-500">ACTIVE</span>
                </div>
                <div className="flex justify-between text-purple-400">
                  <span> DATABASE</span>
                  <span className="text-purple-500">SYNCED</span>
                </div>
                <div className="flex justify-between text-yellow-400">
                  <span> SECURITY</span>
                  <span className="text-yellow-500">ARMED</span>
                </div>
              </div>
            </div>
            
            {/* Quick Commands */}
            <div className="p-4 font-mono text-xs space-y-2 border-t border-green-500/20">
              <div className="text-green-500">[ QUICK_CMDS ]</div>
              <div className="space-y-1">
                <div className="cursor-pointer hover:bg-green-500/20 px-2 py-1 rounded transition-colors">
                  <span className="text-green-400"></span> scan_network
                </div>
                <div className="cursor-pointer hover:bg-green-500/20 px-2 py-1 rounded transition-colors">
                  <span className="text-green-400"></span> optimize_system
                </div>
                <div className="cursor-pointer hover:bg-green-500/20 px-2 py-1 rounded transition-colors">
                  <span className="text-green-400"></span> show_logs
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-4">

              {/* System Welcome with Animation */}
              <div className="text-center opacity-70 py-6 font-mono border border-green-500/20 rounded-lg bg-black/40 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
                <p className="text-green-500 text-lg">SYSTEM_READY</p>
                <p className="text-sm mt-2 text-green-400">AWAITING_USER_INPUT</p>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
              </div>

              {/* Assistant message with typing */}
              <div className="flex gap-3 justify-start message-animation">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-black flex items-center justify-center shadow-lg border border-green-500 font-mono text-xs relative">
                  <div className="absolute -inset-1 bg-green-500 rounded-full animate-ping opacity-20"></div>
                  AI
                </div>
                <div className="rounded-lg px-4 py-3 max-w-[80%] bg-black/80 backdrop-blur-xl border border-green-500/30 shadow-2xl font-mono">
                  <div className="text-green-500 mb-1">SYSTEM@OKZY:</div>
                  <div className="typing-animation">
                    Hello. System initialized and ready for queries. All systems operational. Firewall active. Encryption enabled.
                  </div>
                </div>
              </div>

              {/* User message */}
              <div className="flex gap-3 justify-end message-animation" style={{animationDelay: '0.3s'}}>
                <div className="rounded-lg px-4 py-3 max-w-[80%] bg-green-900/80 backdrop-blur-xl border border-green-500/50 shadow-2xl font-mono">
                  <div className="text-green-300 mb-1">USER@TERMINAL:</div>
                  Show me the ultimate hacker interface with all features!
                </div>
                <div className="h-8 w-8 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border border-green-500/30 font-mono text-xs relative">
                  <div className="absolute -inset-1 bg-green-500 rounded-full animate-ping opacity-20"></div>
                  USR
                </div>
              </div>

              {/* System Security Message */}
              <div className="flex gap-3 justify-start message-animation" style={{animationDelay: '0.6s'}}>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-500 to-black flex items-center justify-center shadow-lg border border-red-500 font-mono text-xs relative">
                  <div className="absolute -inset-1 bg-red-500 rounded-full animate-ping opacity-20"></div>
                  SYS
                </div>
                <div className="rounded-lg px-4 py-3 max-w-[80%] bg-black/80 backdrop-blur-xl border border-red-500/30 shadow-2xl font-mono">
                  <div className="text-red-500 mb-1">SECURITY@SYSTEM:</div>
                  <div className="typing-animation" style={{animationDelay: '0.8s'}}>
                    Firewall active. All connections encrypted. Monitoring network traffic. Threat level: LOW. All systems nominal.
                  </div>
                </div>
              </div>

              {/* Database Message */}
              <div className="flex gap-3 justify-start message-animation" style={{animationDelay: '0.9s'}}>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-black flex items-center justify-center shadow-lg border border-blue-500 font-mono text-xs relative">
                  <div className="absolute -inset-1 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                  DB
                </div>
                <div className="rounded-lg px-4 py-3 max-w-[80%] bg-black/80 backdrop-blur-xl border border-blue-500/30 shadow-2xl font-mono">
                  <div className="text-blue-500 mb-1">DATABASE@SYSTEM:</div>
                  <div className="typing-animation" style={{animationDelay: '1.1s'}}>
                    Database synchronized. 1,247 queries processed. Cache optimized. Ready for operations.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ULTIMATE INPUT BAR */}
        <div className="border-t border-green-500/30 bg-black/80 backdrop-blur-xl p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 items-center mb-2">
              <span className="text-green-500 font-mono text-sm">[ INPUT_TERMINAL ]</span>
              <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
              <span className="text-green-400 font-mono text-xs">READY</span>
            </div>
            
            <div className="flex gap-2 items-start">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 font-mono text-lg">
                  {">"}
                </div>
                <input
                  type="text"
                  placeholder="Click and type your command..."
                  className="w-full border border-green-500/30 bg-black/40 text-green-400 rounded-lg px-10 py-4 backdrop-blur-xl placeholder-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono text-lg typing-input"
                  id="commandInput"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="cursor-blink"></div>
                </div>
                
                {/* Input Suggestions */}
                <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-green-500/30 rounded-lg p-2 hidden font-mono text-xs" id="suggestions">
                  <div className="text-green-500 mb-1">[ SUGGESTIONS ]</div>
                  <div className="space-y-1">
                    <div className="cursor-pointer hover:bg-green-500/20 px-2 py-1 rounded">help - Show available commands</div>
                    <div className="cursor-pointer hover:bg-green-500/20 px-2 py-1 rounded">status - System status</div>
                    <div className="cursor-pointer hover:bg-green-500/20 px-2 py-1 rounded">clear - Clear terminal</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-4 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-2xl border border-green-500/30 font-mono text-sm uppercase tracking-wider flex items-center gap-2">
                  <span>Execute</span>
                  <span className="text-xs">[ENTER]</span>
                </button>
                
                <button className="px-4 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-500 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-2xl border border-blue-500/30 font-mono text-sm uppercase tracking-wider">
                  Clear
                </button>
              </div>
            </div>
            
            {/* Command History */}
            <div className="mt-2 font-mono text-xs text-green-500/70">
              [ HISTORY: help, status, version ]
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Ultimate Hacker Theme */}
      <style>{`
        /* UNSTOPPABLE BINARY RAIN - 7 columns for maximum density */
        .binary-column {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(34, 197, 94, 0.15) 10%,
            rgba(34, 197, 94, 0.25) 20%,
            rgba(34, 197, 94, 0.15) 30%,
            transparent 100%
          );
          background-size: 100% 300px;
          animation: binaryFall 0.6s linear infinite;
        }

        .binary-column:nth-child(1) { animation-delay: 0s; }
        .binary-column:nth-child(2) { animation-delay: 0.1s; }
        .binary-column:nth-child(3) { animation-delay: 0.2s; }
        .binary-column:nth-child(4) { animation-delay: 0.3s; }
        .binary-column:nth-child(5) { animation-delay: 0.4s; }
        .binary-column:nth-child(6) { animation-delay: 0.5s; }
        .binary-column:nth-child(7) { animation-delay: 0.6s; }

        @keyframes binaryFall {
          0% { transform: translateY(-300px); }
          100% { transform: translateY(100vh); }
        }

        /* Add actual binary characters flowing endlessly */
        .binary-column::before {
          content: '0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 400%;
          color: rgba(34, 197, 94, 0.5);
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: bold;
          line-height: 1.3;
          animation: binaryTextFall 0.9s linear infinite;
          white-space: pre-wrap;
          word-wrap: break-word;
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }

        @keyframes binaryTextFall {
          0% { transform: translateY(-150px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        /* SATELLITE DOTS - Floating connection points */
        .satellite-dots::before {
          content: '';
          position: absolute;
          top: 20%;
          left: 60%;
          width: 6px;
          height: 6px;
          background: rgba(34, 197, 94, 0.8);
          border-radius: 50%;
          box-shadow: 
            0 0 20px rgba(34, 197, 94, 0.6),
            120px 80px 0 rgba(59, 130, 246, 0.8),
            200px 150px 0 rgba(168, 85, 247, 0.8),
            300px 50px 0 rgba(239, 68, 68, 0.8);
          animation: satelliteFloat 6s ease-in-out infinite;
        }

        @keyframes satelliteFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -10px) scale(1.1); }
          50% { transform: translate(-5px, 5px) scale(0.9); }
          75% { transform: translate(-10px, -5px) scale(1.05); }
        }

        /* DATA PACKETS - Flying data chunks */
        .data-packets::before {
          content: '📦';
          position: absolute;
          top: 30%;
          right: 20%;
          font-size: 16px;
          animation: dataFly 4s linear infinite;
        }

        .data-packets::after {
          content: '💾';
          position: absolute;
          top: 60%;
          right: 40%;
          font-size: 14px;
          animation: dataFly 3s linear infinite 1s;
        }

        @keyframes dataFly {
          0% { transform: translateX(100px) translateY(0) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(-100px) translateY(-50px) scale(1.2); opacity: 0; }
        }

        /* HACKING POPUPS - Random terminal windows */
        .hacking-popups::before {
          content: '[SECURITY_SCAN]';
          position: absolute;
          top: 25%;
          right: 15%;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(34, 197, 94, 0.5);
          padding: 4px 8px;
          font-family: monospace;
          font-size: 10px;
          color: rgba(34, 197, 94, 0.7);
          animation: popupAppear 8s linear infinite;
        }

        @keyframes popupAppear {
          0%, 85% { opacity: 0; transform: scale(0.8); }
          90%, 95% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }

        /* GLITCH EFFECT */
        .glitch-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent 49%, rgba(34, 197, 94, 0.1) 50%, transparent 51%);
          background-size: 10px 10px;
          animation: glitchMove 0.1s linear infinite;
          opacity: 0.1;
          pointer-events: none;
        }

        @keyframes glitchMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(5px) translateY(5px); }
        }

        /* MESSAGE ANIMATIONS */
        .message-animation {
          animation: messageSlide 0.5s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes messageSlide {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ENHANCED RADAR */
        .radar-scan {
          width: 500px;
          height: 500px;
          border: 4px solid rgba(34, 197, 94, 0.7);
          border-radius: 50%;
          position: relative;
          box-shadow: 
            0 0 60px rgba(34, 197, 94, 0.4),
            inset 0 0 60px rgba(34, 197, 94, 0.2);
        }

        .radar-scan::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: conic-gradient(
            transparent 0deg, 
            rgba(34, 197, 94, 0.4) 40deg, 
            transparent 80deg
          );
          animation: radarSpin 2.5s linear infinite;
        }

        .radar-scan::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          width: 8px;
          height: 250px;
          background: linear-gradient(to top, transparent, rgba(34, 197, 94, 1), rgba(34, 197, 94, 0.8));
          transform-origin: bottom center;
          animation: radarSweep 1.2s linear infinite;
          filter: blur(1px);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
        }

        /* INPUT SUGGESTIONS */
        .typing-input:focus + #suggestions {
          display: block;
        }

        /* LIVE STATS ANIMATION */
        #liveCpu, #liveRam, #liveNet {
          animation: statPulse 2s ease-in-out infinite;
        }

        @keyframes statPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* TYPING ANIMATION */
        .typing-animation {
          overflow: hidden;
          border-right: 2px solid rgba(34, 197, 94, 0.7);
          white-space: nowrap;
          animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: rgba(34, 197, 94, 0.7); }
        }

        /* CURSOR BLINK */
        .cursor-blink {
          width: 2px;
          height: 20px;
          background: rgba(34, 197, 94, 0.8);
          animation: cursorBlink 1s infinite;
        }

        @keyframes cursorBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* HACKER GRID */
        .hacker-grid {
          background-image: 
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridPulse 6s ease-in-out infinite;
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        /* SCAN LINES */
        .scan-lines {
          background: repeating-linear-gradient(
            to bottom,
            transparent 0%,
            rgba(34, 197, 94, 0.05) 1px,
            transparent 3px
          );
          background-size: 100% 4px;
          animation: scanMove 0.08s linear infinite;
        }

        @keyframes scanMove {
          0% { transform: translateY(0px); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};

export default Chat;