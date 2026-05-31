import React, { useRef, useEffect, useState } from 'react';

const MINEFLOW_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MINEFLOW AI v3.0 – Fleet Productivity & Dispatch Platform</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#0d1117;--surface:#161b22;--surface2:#21262d;--surface3:#1a1f27;--border:#30363d;--border2:rgba(48,54,61,.7);
  --accent:#f59e0b;--accent2:#d97706;--blue:#3b82f6;--green:#22c55e;--red:#ef4444;
  --orange:#f97316;--purple:#a855f7;--cyan:#06b6d4;--teal:#14b8a6;--pink:#ec4899;
  --text:#e6edf3;--text2:#8b949e;--text3:#6e7681;
  --sidebar-w:220px;
}
*,::-webkit-scrollbar{scrollbar-width:thin;scrollbar-color:var(--border) var(--surface)}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:var(--surface)}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;overflow:hidden}
/* SIDEBAR */
#sidebar{width:var(--sidebar-w);background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;height:100vh;overflow-y:auto;flex-shrink:0;transition:.3s}
.sb-logo{padding:14px 14px 12px;border-bottom:1px solid var(--border)}
.sb-logo .t1{font-size:15px;font-weight:800;color:var(--accent);letter-spacing:.5px}
.sb-logo .t2{font-size:10px;color:var(--text2);margin-top:2px}
.sb-logo .t3{font-size:10px;color:var(--text3);margin-top:1px}
.sb-nav{flex:1;padding:8px 0}
.sb-nav a{display:flex;align-items:center;gap:9px;padding:8px 14px;color:var(--text2);text-decoration:none;font-size:12.5px;border-left:3px solid transparent;transition:.15s}
.sb-nav a:hover{color:var(--text);background:var(--surface2)}
.sb-nav a.active{color:var(--accent);background:rgba(245,158,11,.07);border-left-color:var(--accent);font-weight:600}
.sb-nav .ic{font-size:15px;width:18px;text-align:center;flex-shrink:0}
.sb-section{font-size:9.5px;text-transform:uppercase;letter-spacing:1px;color:var(--text3);padding:10px 14px 3px;font-weight:600}
.sb-footer{padding:10px 14px;border-top:1px solid var(--border);font-size:10px;color:var(--text3)}
/* MAIN */
#main{flex:1;display:flex;flex-direction:column;overflow:hidden;height:100vh}
#topbar{background:var(--surface);border-bottom:1px solid var(--border);padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;gap:10px}
#topbar .page-title{font-size:15px;font-weight:700}
#topbar .meta{display:flex;gap:10px;align-items:center;font-size:11px;color:var(--text2)}
.badge{background:rgba(245,158,11,.15);color:var(--accent);font-size:10px;padding:2px 7px;border-radius:8px;font-weight:700;letter-spacing:.3px}
.badge-blue{background:rgba(59,130,246,.15);color:var(--blue)}
.badge-green{background:rgba(34,197,94,.15);color:var(--green)}
#content{flex:1;overflow-y:auto;padding:18px 20px 30px}
/* SECTIONS */
.section{display:none}.section.active{display:block}
/* GRID */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.gsim{display:grid;grid-template-columns:360px 1fr;gap:14px}
/* CARDS */
.card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:14px}
.card-title{font-size:10.5px;text-transform:uppercase;letter-spacing:.6px;color:var(--text2);margin-bottom:11px;font-weight:700;display:flex;align-items:center;gap:6px}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px}
.card-header .card-title{margin-bottom:0}
/* KPI */
.kpi{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px}
.kpi-label{font-size:10.5px;color:var(--text2);margin-bottom:3px}
.kpi-value{font-size:24px;font-weight:800;line-height:1.1}
.kpi-sub{font-size:10.5px;color:var(--text2);margin-top:3px}
.kpi-delta{font-size:10.5px;font-weight:600;margin-top:3px}
.up{color:var(--green)}.down{color:var(--red)}.neutral{color:var(--text2)}
/* STATUS */
.status{display:inline-block;font-size:9.5px;font-weight:700;padding:2px 7px;border-radius:4px;text-transform:uppercase;letter-spacing:.3px}
.status.ok{background:rgba(34,197,94,.13);color:var(--green)}
.status.warn{background:rgba(249,115,22,.13);color:var(--orange)}
.status.crit{background:rgba(239,68,68,.13);color:var(--red)}
.status.info{background:rgba(59,130,246,.13);color:var(--blue)}
.status.neu{background:rgba(139,148,158,.13);color:var(--text2)}
/* INPUTS */
.fg label{display:block;font-size:10.5px;color:var(--text2);margin-bottom:3px;font-weight:500}
.fg input,.fg select,.fg textarea{width:100%;background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:6px 9px;border-radius:6px;font-size:12.5px;font-family:inherit}
.fg input:focus,.fg select:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 2px rgba(245,158,11,.1)}
.fr2{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:9px}
.fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;margin-bottom:9px}
.fr1{grid-template-columns:1fr;margin-bottom:9px}
/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:6px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:.15s;font-family:inherit}
.btn-p{background:var(--accent);color:#000}.btn-p:hover{background:var(--accent2)}
.btn-s{background:var(--surface2);color:var(--text);border:1px solid var(--border)}.btn-s:hover{background:var(--border)}
.btn-g{background:rgba(34,197,94,.15);color:var(--green);border:1px solid rgba(34,197,94,.3)}.btn-g:hover{background:rgba(34,197,94,.25)}
.btn-r{background:rgba(239,68,68,.15);color:var(--red);border:1px solid rgba(239,68,68,.3)}.btn-r:hover{background:rgba(239,68,68,.25)}
.btn-b{background:rgba(59,130,246,.15);color:var(--blue);border:1px solid rgba(59,130,246,.3)}.btn-b:hover{background:rgba(59,130,246,.25)}
.btn-sm{padding:4px 9px;font-size:11px}
/* TABLES */
.tbl{width:100%;border-collapse:collapse;font-size:12px}
.tbl th{background:var(--surface2);color:var(--text2);font-weight:600;padding:6px 9px;text-align:left;border-bottom:1px solid var(--border);white-space:nowrap;font-size:11px;text-transform:uppercase;letter-spacing:.3px}
.tbl td{padding:6px 9px;border-bottom:1px solid rgba(48,54,61,.4);vertical-align:middle}
.tbl tr:hover td{background:rgba(33,38,45,.5)}
.tbl input,.tbl select{background:transparent;border:none;color:var(--text);font-size:12px;width:100%;min-width:50px;font-family:inherit;padding:0}
.tbl input:focus,.tbl select:focus{outline:none;border-bottom:1px solid var(--accent);background:rgba(245,158,11,.05)}
.tbl select{cursor:pointer}
/* CHARTS */
.ch{position:relative;height:200px}
.ch-lg{position:relative;height:260px}
.ch-sm{position:relative;height:150px}
/* ALERTS */
.alert{padding:9px 12px;border-radius:7px;font-size:11.5px;margin-bottom:7px;border-left:3px solid}
.alert.crit{background:rgba(239,68,68,.07);border-color:var(--red)}
.alert.warn{background:rgba(249,115,22,.07);border-color:var(--orange)}
.alert.ok{background:rgba(34,197,94,.07);border-color:var(--green)}
.alert.info{background:rgba(59,130,246,.07);border-color:var(--blue)}
.alert strong{font-weight:700;display:block;margin-bottom:1px}
.alert .act{margin-top:5px;font-weight:600;color:var(--accent);font-size:11px}
/* SECTION HEADER */
.shdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.shdr h2{font-size:17px;font-weight:700}
/* WEATHER PANEL */
.weather-panel{background:linear-gradient(135deg,rgba(59,130,246,.08),rgba(14,165,233,.04));border:1px solid rgba(59,130,246,.25);border-radius:10px;padding:14px;margin-bottom:14px}
.weather-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--blue);margin-bottom:12px}
.weather-impact{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:600;margin-top:4px}
.weather-impact.neg{color:var(--red)}.weather-impact.ok{color:var(--green)}.weather-impact.warn{color:var(--orange)}
.wh-result{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;padding-top:10px;border-top:1px solid rgba(59,130,246,.2)}
.wh-chip{text-align:center;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:7px;padding:8px 12px;flex:1;min-width:100px}
.wh-chip .wc-val{font-size:20px;font-weight:800;color:var(--blue)}
.wh-chip .wc-lbl{font-size:10px;color:var(--text2);margin-top:2px}
/* MONTHLY TABLE */
.monthly-tbl{width:100%;border-collapse:collapse;font-size:11.5px}
.monthly-tbl th{background:var(--surface2);color:var(--text2);font-weight:600;padding:7px 8px;text-align:center;border:1px solid var(--border);white-space:nowrap;font-size:10px;text-transform:uppercase;letter-spacing:.2px}
.monthly-tbl td{padding:4px 6px;border:1px solid rgba(48,54,61,.4);vertical-align:middle;text-align:center}
.monthly-tbl td:first-child,.monthly-tbl td:nth-child(2){text-align:left}
.monthly-tbl input,.monthly-tbl select{background:transparent;border:none;color:var(--text);font-size:11.5px;width:100%;text-align:center;font-family:inherit;padding:1px}
.monthly-tbl input:focus,.monthly-tbl select:focus{outline:none;border-bottom:1px solid var(--accent)}
.monthly-tbl tr.total-row td{background:var(--surface2);font-weight:700;color:var(--accent)}
.monthly-tbl tr:hover td{background:rgba(245,158,11,.03)}
/* MF BAR */
.mf-track{height:10px;background:var(--surface2);border-radius:5px;position:relative;overflow:visible;margin:4px 0}
.mf-fill{height:100%;border-radius:5px;transition:.3s}
.mf-zone{position:absolute;top:0;height:100%;background:rgba(34,197,94,.15);border-left:1px solid rgba(34,197,94,.4);border-right:1px solid rgba(34,197,94,.4)}
/* SEPARATOR */
.sep{font-size:10.5px;color:var(--text2);font-weight:700;padding:7px 0;border-bottom:1px solid var(--border);margin-bottom:9px;text-transform:uppercase;letter-spacing:.4px}
/* DIVIDER */
.div{border:none;border-top:1px solid var(--border);margin:10px 0}
/* PROG BAR */
.prog{height:7px;background:var(--surface2);border-radius:3px;overflow:hidden}
.prog-f{height:100%;border-radius:3px;transition:.3s}
/* SCENARIO TABLE */
.sctbl{width:100%;border-collapse:collapse;font-size:11.5px}
.sctbl th{background:var(--accent);color:#000;padding:7px 10px;text-align:center;font-size:11px;font-weight:700}
.sctbl td{padding:7px 10px;border:1px solid var(--border);text-align:center}
.sctbl td:first-child{text-align:left;font-weight:600;background:var(--surface2);white-space:nowrap}
.sctbl .better{color:var(--green);font-weight:700}.sctbl .worse{color:var(--red);font-weight:700}
/* SR DISPLAY */
.sr-disp{display:flex;align-items:center;justify-content:center;gap:16px;padding:14px 0}
.sr-num .val{font-size:36px;font-weight:800}.sr-num .lbl{font-size:11px;color:var(--text2);text-align:center}
.sr-div{font-size:24px;color:var(--text3)}
/* ROAD VIS */
.road-vis-wrap{background:var(--surface2);border-radius:7px;padding:10px;margin-top:10px}
.road-canvas{position:relative;height:44px;overflow:hidden;border-radius:4px}
.road-lane-l{position:absolute;left:0;right:0;top:2px;height:18px;background:rgba(59,130,246,.07);border:1px solid rgba(59,130,246,.2);border-radius:3px}
.road-lane-e{position:absolute;left:0;right:0;top:24px;height:18px;background:rgba(139,148,158,.05);border:1px solid rgba(48,54,61,.5);border-radius:3px}
/* PRINT */
@media print{#sidebar{display:none!important}#topbar{display:none!important}#content{overflow:visible!important}.section{display:block!important}.no-print{display:none!important}}
/* RESPONSIVE */
@media(max-width:900px){#sidebar{display:none}#sidebar.open{display:flex;position:fixed;z-index:999;height:100vh}.gsim{grid-template-columns:1fr}.g4{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.g4,.g3,.g2{grid-template-columns:1fr}.fr2,.fr3{grid-template-columns:1fr}#content{padding:10px}}
/* SPECIAL */
.num-big{font-size:32px;font-weight:800;line-height:1}.unit-sm{font-size:12px;color:var(--text2);margin-top:2px}
.flex{display:flex;align-items:center}.btw{justify-content:space-between}.gap8{gap:8px}.gap12{gap:12px}
.mb4{margin-bottom:4px}.mb8{margin-bottom:8px}.mb12{margin-bottom:12px}.mb14{margin-bottom:14px}.mb16{margin-bottom:16px}
.mt8{margin-top:8px}.mt10{margin-top:10px}.mt12{margin-top:12px}
/* DT Traffic specific */
.dt-metric{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px 14px}
.dt-metric .dm-lbl{font-size:10.5px;color:var(--text2);margin-bottom:5px}
.dt-metric .dm-val{font-size:26px;font-weight:800;font-family:'Courier New',monospace;line-height:1}
.dt-metric .dm-unit{font-size:10.5px;color:var(--text2);margin-top:3px}
.dt-metric .dm-status{margin-top:5px;font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;display:inline-block;text-transform:uppercase}
.safe-bg{background:rgba(34,197,94,.13);color:var(--green)}
.warn-bg{background:rgba(245,158,11,.13);color:var(--accent)}
.danger-bg{background:rgba(239,68,68,.13);color:var(--red)}
.spd-track{height:6px;background:var(--surface2);border-radius:3px;overflow:hidden;margin-top:8px}
.spd-fill{height:100%;border-radius:3px;transition:.3s}
.dt-fleet-tbl{width:100%;border-collapse:collapse;font-size:12.5px}
.dt-fleet-tbl th{padding:7px 9px;text-align:left;font-size:10px;font-weight:600;color:var(--text3);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid var(--border2)}
.dt-fleet-tbl td{padding:6px 9px;border-bottom:1px solid var(--border2);vertical-align:middle}
.dt-fleet-tbl tr:hover td{background:var(--surface2)}
.dt-fleet-tbl input[type=text],.dt-fleet-tbl input[type=number]{background:transparent;border:none;color:var(--text);font-size:12.5px;width:100%;min-width:60px;font-family:inherit}
.dt-fleet-tbl input:focus{outline:none;border-bottom:1px solid var(--accent)}
.contrib-bar{height:5px;background:rgba(59,130,246,.1);border-radius:3px;overflow:hidden;margin-top:3px}
.contrib-fill{height:100%;background:var(--blue);border-radius:3px;transition:.3s}
.contrib-val{font-size:10px;font-family:'Courier New',monospace;color:var(--blue);margin-top:1px}
.btn-rm{background:none;border:1px solid rgba(239,68,68,.3);color:var(--red);border-radius:5px;padding:2px 8px;cursor:pointer;font-size:10.5px}
.btn-rm:hover{background:rgba(239,68,68,.1)}
.dt-info-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.dt-chip{font-size:10.5px;color:var(--text2);background:var(--surface2);border:1px solid var(--border);border-radius:5px;padding:3px 9px;font-family:'Courier New',monospace}
.dt-chip b{color:var(--text)}
/* REPORT STYLES */
.rep-section{break-inside:avoid;margin-bottom:16px}
.rep-title{font-size:14px;font-weight:700;color:var(--accent);border-bottom:2px solid var(--border);padding-bottom:6px;margin-bottom:10px}
/* COST specific */
.cost-eq-row{display:grid;grid-template-columns:200px 1fr 1fr 1fr 1fr 1fr 1fr 120px;gap:8px;align-items:center;padding:8px;border-radius:6px;border:1px solid var(--border);margin-bottom:6px;background:var(--surface2)}
.cost-cat-header{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text3);padding:6px 0 3px;margin-top:8px}
/* TOOLTIP */
[title]{cursor:help}
</style>
</head>
<body>
<!-- SIDEBAR -->
<nav id="sidebar">
  <div class="sb-logo">
    <div class="t1">⛏ MINEFLOW AI</div>
    <div class="t2">Fleet Productivity Platform v3.0</div>
    <div class="t3"><span class="badge">LIVE</span></div>
  </div>
  <div class="sb-nav">
    <div class="sb-section">Main</div>
    <a href="#" class="active" data-tab="dashboard"><span class="ic">🏠</span>Dashboard</a>
    <div class="sb-section">Fleet Setting</div>
    <a href="#" data-tab="monthly"><span class="ic">📅</span>Monthly Fleet Setting</a>
    <div class="sb-section">Simulation</div>
    <a href="#" data-tab="ob-sim"><span class="ic">⛰️</span>OB Simulator</a>
    <a href="#" data-tab="coal-sim"><span class="ic">🏭</span>Coal Simulator</a>
    <a href="#" data-tab="phr"><span class="ic">⚖️</span>PHR / SR Analysis</a>
    <a href="#" data-tab="dt-traffic"><span class="ic">🚦</span>DT Traffic Density</a>
    <div class="sb-section">Analysis</div>
    <a href="#" data-tab="fleet-ref"><span class="ic">📋</span>Fleet Reference</a>
    <a href="#" data-tab="scenario"><span class="ic">🔄</span>Scenario Compare</a>
    <a href="#" data-tab="cost"><span class="ic">💰</span>Cost Analysis</a>
    <div class="sb-section">Export</div>
    <a href="#" data-tab="report"><span class="ic">📊</span>Monthly Report</a>
  </div>
  <div class="sb-footer">v3.0 · MINEFLOW AI · KPCS</div>
</nav>

<!-- MAIN -->
<div id="main">
  <div id="topbar">
    <div style="display:flex;align-items:center;gap:10px">
      <span style="cursor:pointer;font-size:18px" onclick="toggleSidebar()">☰</span>
      <div class="page-title" id="topbar-title">Executive Dashboard</div>
    </div>
    <div class="meta">
      <span id="topbar-date"></span>
      <span class="badge">LIVE</span>
      <span class="badge badge-green" id="total-dt-badge">271 DT OB</span>
      <span class="badge badge-blue" id="total-coal-badge">91 DT Coal</span>
    </div>
  </div>
  <div id="content">





    <!-- ══════════════════════════════════════════════ DASHBOARD ══════════════════════════════════════════════ -->
    <div class="section active" id="tab-dashboard">
      <div class="g4 mb14">
        <div class="kpi"><div class="kpi-label">🪨 OB Target/Month</div><div class="kpi-value" style="color:var(--orange)">16.66M</div><div class="kpi-sub">BCM · 30 Working Days</div><div class="kpi-delta neutral">SR: 7.11 BCM/ton</div></div>
        <div class="kpi"><div class="kpi-label">🏭 Coal Target/Month</div><div class="kpi-value" style="color:var(--blue)">2.34M</div><div class="kpi-sub">Ton · Plan 3MRP</div><div class="kpi-delta neutral">PA1+PA4 Areas</div></div>
        <div class="kpi"><div class="kpi-label">🚛 OB Fleet Active</div><div class="kpi-value" style="color:var(--green)">363</div><div class="kpi-sub">HD785 Units</div><div class="kpi-delta up">PA1:97 · PA2:106 · PA3:47 · PA4:113</div></div>
        <div class="kpi"><div class="kpi-label">⚙️ Avg MF (All Areas)</div><div class="kpi-value" style="color:var(--accent)">0.941</div><div class="kpi-sub">Target: 0.90–1.05</div><div class="kpi-delta up">✓ Balanced</div></div>
      </div>
      <div class="g3 mb14">
        <div class="kpi"><div class="kpi-label">📊 Avg WH Eff (PA=94%, UA=62.8%)</div><div class="kpi-value" style="color:var(--cyan)">14.18</div><div class="kpi-sub">hrs/day · 425 hrs/month</div></div>
        <div class="kpi"><div class="kpi-label">🌧️ Weather Loss (Dec Plan)</div><div class="kpi-value" style="color:var(--blue)">119</div><div class="kpi-sub">hrs/month (Rain:75.7 + Slip:43.4)</div></div>
        <div class="kpi"><div class="kpi-label">🔧 OB Loader Units</div><div class="kpi-value" style="color:var(--purple)">90</div><div class="kpi-sub">EX2600:16 · PC2000-11:10 · PC2000:18</div></div>
      </div>
      <div class="g2 mb14">
        <div class="card"><div class="card-title">📊 Monthly OB Production by Area (BCM)</div><div class="ch"><canvas id="ch-db-area"></canvas></div></div>
        <div class="card"><div class="card-title">⚖️ Matching Factor by Area</div><div class="ch"><canvas id="ch-db-mf"></canvas></div></div>
      </div>
      <div class="g2 mb14">
        <div class="card"><div class="card-title">🚛 Fleet Truck Distribution</div><div class="ch-sm"><canvas id="ch-db-fleet"></canvas></div></div>
        <div class="card"><div class="card-title">📦 Loader Productivity Reference (bcm/hr)</div><div class="ch-sm"><canvas id="ch-db-lprdty"></canvas></div></div>
      </div>
      <div class="card">
        <div class="card-title">📋 Dec 2025 Area Fleet Setting Summary</div>
        <div style="overflow-x:auto"><table class="tbl"><thead><tr>
          <th>Area</th><th>Pit</th><th>Loader</th><th>N Loader</th><th>Dist(km)</th>
          <th>Plan Prdty</th><th>MF Setting</th><th>MF Actual</th><th>Need DT</th>
          <th>N Hari</th><th>Monthly BCM</th><th>Status</th>
        </tr></thead><tbody id="db-area-tbody"></tbody></table></div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ MONTHLY FLEET SETTING ══════════════════════════════════════════════ -->
    <div class="section" id="tab-monthly">
      <div class="shdr">
        <h2>📅 Monthly Fleet Setting</h2>
        <div style="display:flex;gap:8px">
          <button class="btn btn-g btn-sm" onclick="addMonthlyRow()">+ Add Fleet</button>
          <button class="btn btn-b btn-sm" onclick="recalcAll()">↻ Recalc All</button>
          <button class="btn btn-s btn-sm" onclick="saveMonthlyPreset()">💾 Save Preset</button>
          <button class="btn btn-s btn-sm" onclick="printMonthly()">🖨️ Print</button>
        </div>
      </div>

      <!-- WEATHER PANEL -->
      <div class="weather-panel mb14">
        <div class="weather-title">🌤️ Weather & Operational Parameters — Impact on UA & WH</div>
        <div class="g5">
          <div class="fg"><label title="Total jam hujan dalam sebulan">Rain (hrs/month)</label>
            <input type="number" id="wx-rain" value="75.7" step="0.1" oninput="calcWeather()">
            <div id="wx-rain-impact" class="weather-impact neg"></div></div>
          <div class="fg"><label title="Total jam licin akibat hujan">Slippery (hrs/month)</label>
            <input type="number" id="wx-slip" value="43.4" step="0.1" oninput="calcWeather()">
            <div id="wx-slip-impact" class="weather-impact neg"></div></div>
          <div class="fg"><label title="Total jam kabut asap">Haze (hrs/month)</label>
            <input type="number" id="wx-haze" value="0" step="0.1" oninput="calcWeather()">
            <div id="wx-haze-impact" class="weather-impact neg"></div></div>
          <div class="fg"><label title="Delay operasional per hari">Delay (min/day)</label>
            <input type="number" id="wx-delay" value="215" step="5" oninput="calcWeather()">
            <div id="wx-delay-impact" class="weather-impact neg"></div></div>
          <div class="fg"><label title="Hari kerja efektif">Working Days</label>
            <input type="number" id="wx-days" value="30" min="20" max="31" oninput="calcWeather()">
            <div id="wx-days-impact" class="weather-impact ok"></div></div>
        </div>
        <div class="wh-result">
          <div class="wh-chip"><div class="wc-val" id="wx-wh">14.18</div><div class="wc-lbl">WH Eff/day (hrs)</div></div>
          <div class="wh-chip"><div class="wc-val" id="wx-wh-monthly">425</div><div class="wc-lbl">Total WH/month</div></div>
          <div class="wh-chip"><div class="wc-val" id="wx-ua-adj">62.8</div><div class="wc-lbl">Adj. UA (%)</div></div>
          <div class="wh-chip"><div class="wc-val" id="wx-eff-pct">59.1</div><div class="wc-lbl">WH Efficiency (%)</div></div>
          <div class="wh-chip"><div class="wc-val" id="wx-loss">119</div><div class="wc-lbl">Weather Loss (hrs)</div></div>
          <div class="wh-chip"><div class="wc-val" id="wx-base-pa">94</div><div class="wc-lbl">Base PA (%)</div></div>
        </div>
        <div id="wx-warning" class="alert warn mt8" style="display:none"><strong>⚠️ High Weather Impact</strong><span id="wx-warning-msg"></span></div>
      </div>

      <!-- FLEET TABLE OB -->
      <div class="card mb14">
        <div class="card-header">
          <div class="card-title">⛰️ OB Fleet Configuration</div>
          <div style="display:flex;gap:8px;align-items:center">
            <span id="ob-total-summary" class="badge" style="font-size:11px"></span>
            <button class="btn btn-s btn-sm" onclick="addOBRow()">+ Add Row</button>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table class="monthly-tbl" id="ob-fleet-tbl">
            <thead><tr>
              <th style="width:28px">#</th>
              <th style="min-width:70px">Area/Pit</th>
              <th style="min-width:130px">EGI Loader</th>
              <th style="min-width:55px">N Loader</th>
              <th style="min-width:80px">Prdty(bcm/hr)</th>
              <th style="min-width:55px">PA(%)</th>
              <th style="min-width:55px">UA(%)</th>
              <th style="min-width:65px">Dist(km)</th>
              <th style="min-width:55px">N DT</th>
              <th style="min-width:50px">MF</th>
              <th style="min-width:55px">Need DT</th>
              <th style="min-width:90px">Monthly BCM</th>
              <th style="min-width:55px">Status</th>
              <th style="min-width:40px"></th>
            </tr></thead>
            <tbody id="ob-fleet-tbody"></tbody>
            <tfoot><tr class="total-row" id="ob-total-row">
              <td colspan="4" style="text-align:right">TOTAL OB:</td>
              <td id="ob-tot-prdty">—</td>
              <td id="ob-tot-pa">—</td>
              <td id="ob-tot-ua">—</td>
              <td>—</td>
              <td id="ob-tot-ndt">—</td>
              <td id="ob-tot-mf">—</td>
              <td id="ob-tot-needdt">—</td>
              <td id="ob-tot-monthly">—</td>
              <td colspan="2"></td>
            </tr></tfoot>
          </table>
        </div>
      </div>

      <!-- FLEET TABLE COAL -->
      <div class="card mb14">
        <div class="card-header">
          <div class="card-title">🏭 Coal Fleet Configuration</div>
          <div style="display:flex;gap:8px;align-items:center">
            <span id="coal-total-summary" class="badge badge-blue" style="font-size:11px"></span>
            <button class="btn btn-s btn-sm" onclick="addCoalRow()">+ Add Row</button>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table class="monthly-tbl" id="coal-fleet-tbl">
            <thead><tr>
              <th>#</th><th>Area/Pit</th><th>EGI Loader</th><th>N Loader</th>
              <th>Prdty(ton/hr)</th><th>PA(%)</th><th>UA(%)</th><th>Dist(km)</th>
              <th>N DT</th><th>MF</th><th>Need DT</th><th>Monthly Ton</th><th>Status</th><th></th>
            </tr></thead>
            <tbody id="coal-fleet-tbody"></tbody>
            <tfoot><tr class="total-row" id="coal-total-row">
              <td colspan="4" style="text-align:right">TOTAL COAL:</td>
              <td id="coal-tot-prdty">—</td><td id="coal-tot-pa">—</td>
              <td id="coal-tot-ua">—</td><td>—</td>
              <td id="coal-tot-ndt">—</td><td id="coal-tot-mf">—</td>
              <td id="coal-tot-needdt">—</td><td id="coal-tot-monthly">—</td>
              <td colspan="2"></td>
            </tr></tfoot>
          </table>
        </div>
      </div>

      <!-- SUPPORT EQUIPMENT -->
      <div class="card mb14">
        <div class="card-header">
          <div class="card-title">🔧 Support Equipment (Dozer & Grader)</div>
          <button class="btn btn-s btn-sm" onclick="addSupportRow()">+ Add Row</button>
        </div>
        <div style="overflow-x:auto">
          <table class="monthly-tbl" id="support-fleet-tbl">
            <thead><tr>
              <th>#</th><th>Area</th><th>Equipment Type</th><th>Unit Count</th>
              <th>PA(%)</th><th>UA(%)</th><th>Role/Task</th>
              <th>Cost/hr(USD)</th><th>Monthly Cost(USD)</th><th>Status</th><th></th>
            </tr></thead>
            <tbody id="support-tbody"></tbody>
          </table>
        </div>
      </div>

      <!-- MONTHLY KPI SUMMARY -->
      <div class="g4 mb14" id="monthly-kpi-wrap">
        <div class="kpi"><div class="kpi-label">🪨 OB Total Monthly</div><div class="kpi-value" id="m-ob-total" style="color:var(--orange)">—</div><div class="kpi-sub">BCM/month</div></div>
        <div class="kpi"><div class="kpi-label">🏭 Coal Total Monthly</div><div class="kpi-value" id="m-coal-total" style="color:var(--blue)">—</div><div class="kpi-sub">Ton/month</div></div>
        <div class="kpi"><div class="kpi-label">⚖️ Strip Ratio</div><div class="kpi-value" id="m-sr" style="color:var(--accent)">—</div><div class="kpi-sub">BCM/ton</div></div>
        <div class="kpi"><div class="kpi-label">🚛 Total DT</div><div class="kpi-value" id="m-total-dt" style="color:var(--green)">—</div><div class="kpi-sub">OB + Coal trucks</div></div>
      </div>
      <div class="card">
        <div class="card-title">Production vs Target Analysis</div>
        <div class="ch"><canvas id="ch-monthly-compare"></canvas></div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ OB SIMULATOR ══════════════════════════════════════════════ -->
    <div class="section" id="tab-ob-sim">
      <div class="shdr"><h2>⛰️ OB Fleet Simulator</h2><button class="btn btn-p btn-sm" onclick="runOBSim()">▶ Calculate</button></div>
      <div class="gsim">
        <div>
          <div class="card" style="position:sticky;top:0">
            <div class="card-title">⚙️ Parameters</div>
            <div class="sep">Equipment</div>
            <div class="fr2">
              <div class="fg"><label>Loader Type</label><select id="ob-loader">
                <option value="EX2600">EX2600-7 (1200 bcm/hr)</option>
                <option value="PC3400">PC3400 (1350 bcm/hr)</option>
                <option value="PC2000-11R">PC2000-11R (950 bcm/hr)</option>
                <option value="PC2000" selected>PC2000 (800 bcm/hr)</option>
                <option value="PC1250">PC1250SP-8 (525 bcm/hr)</option>
                <option value="EX1200">EX1200 (525 bcm/hr)</option>
              </select></div>
              <div class="fg"><label>N Loaders</label><input type="number" id="ob-nloader" value="1" min="1" max="10"></div>
            </div>
            <div class="fr2">
              <div class="fg"><label>Truck</label><select id="ob-truck"><option value="HD785" selected>HD785-7 (91t)</option></select></div>
              <div class="fg"><label>N Trucks</label><input type="number" id="ob-ntruck" value="7" min="1" max="30"></div>
            </div>
            <div class="sep">Haul Road</div>
            <div class="fr2">
              <div class="fg"><label>Dist 1-way (km)</label><input type="number" id="ob-dist" value="2.8" step="0.1"></div>
              <div class="fg"><label>MF Target</label><input type="number" id="ob-mft" value="0.95" step="0.01"></div>
            </div>
            <div class="fr2">
              <div class="fg"><label>Spd Loaded (km/h)</label><input type="number" id="ob-spdl" value="18" step="1"></div>
              <div class="fg"><label>Spd Empty (km/h)</label><input type="number" id="ob-spde" value="25" step="1"></div>
            </div>
            <div class="fr2">
              <div class="fg"><label>Grade (%)</label><input type="number" id="ob-grade" value="8" step="0.5"></div>
              <div class="fg"><label>Roll Resist (%)</label><input type="number" id="ob-rr" value="3" step="0.5"></div>
            </div>
            <div class="sep">Operational</div>
            <div class="fr2">
              <div class="fg"><label>PA (%)</label><input type="number" id="ob-pa" value="94" step="0.5"></div>
              <div class="fg"><label>UA (%)</label><input type="number" id="ob-ua" value="62.8" step="0.5"></div>
            </div>
            <div class="fr2">
              <div class="fg"><label>WH/day (hrs)</label><input type="number" id="ob-wh" value="14.18" step="0.1"></div>
              <div class="fg"><label>Working Days</label><input type="number" id="ob-days" value="30" min="20" max="31"></div>
            </div>
            <div class="fr2">
              <div class="fg"><label>Spot (min)</label><input type="number" id="ob-spot" value="0.5" step="0.1"></div>
              <div class="fg"><label>Dump (min)</label><input type="number" id="ob-dump" value="2" step="0.1"></div>
            </div>
            <div class="fr2 fr1"><div class="fg"><label>Monthly Target (BCM)</label><input type="number" id="ob-tgt" value="4411880" step="10000"></div></div>
            <button class="btn btn-p" style="width:100%;margin-top:8px" onclick="runOBSim()">▶ Run OB Simulation</button>
            <button class="btn btn-s" style="width:100%;margin-top:6px" onclick="saveOBScenario()">💾 Save Scenario</button>
          </div>
        </div>
        <div>
          <div class="g3 mb14">
            <div class="kpi"><div class="kpi-label">🔁 Cycle Time</div><div class="kpi-value" id="ob-r-ct" style="color:var(--accent)">—</div><div class="kpi-sub">min/cycle</div></div>
            <div class="kpi"><div class="kpi-label">⚖️ MF</div><div class="kpi-value" id="ob-r-mf" style="color:var(--green)">—</div><div class="kpi-sub" id="ob-r-mf-st">Run sim</div></div>
            <div class="kpi"><div class="kpi-label">🎯 Need DT</div><div class="kpi-value" id="ob-r-needdt" style="color:var(--blue)">—</div><div class="kpi-sub" id="ob-r-needdt-s">Optimal trucks</div></div>
          </div>
          <div class="g3 mb14">
            <div class="kpi"><div class="kpi-label">📦 Loader Prod</div><div class="kpi-value" id="ob-r-lprd" style="color:var(--orange)">—</div><div class="kpi-sub">BCM/hr</div></div>
            <div class="kpi"><div class="kpi-label">🚛 Fleet Prod</div><div class="kpi-value" id="ob-r-fprd" style="color:var(--green)">—</div><div class="kpi-sub">BCM/hr</div></div>
            <div class="kpi"><div class="kpi-label">📅 Monthly</div><div class="kpi-value" id="ob-r-mo" style="color:var(--purple)">—</div><div class="kpi-sub">BCM/month</div></div>
          </div>
          <div id="ob-mf-bar-wrap" class="mb14"></div>
          <div class="g2 mb14">
            <div class="card"><div class="card-title">CT Breakdown</div><div class="ch"><canvas id="ch-ob-ct"></canvas></div></div>
            <div class="card"><div class="card-title">MF Sensitivity (1–16 trucks)</div><div class="ch"><canvas id="ch-ob-mf"></canvas></div></div>
          </div>
          <div class="card mb14"><div class="card-title">Loader vs Fleet Productivity</div><div class="ch-sm"><canvas id="ch-ob-prod"></canvas></div></div>
          <div class="card mb14" id="ob-recs"><div class="card-title">🤖 Dispatch Recommendations</div><div id="ob-rec-list"></div></div>
          <div class="card"><div class="card-title">Cycle Time Detail</div>
            <table class="tbl"><thead><tr><th>Component</th><th>Time (min)</th><th>%</th><th>Notes</th></tr></thead>
            <tbody id="ob-ct-tbody"></tbody></table></div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ COAL SIMULATOR ══════════════════════════════════════════════ -->
    <div class="section" id="tab-coal-sim">
      <div class="shdr"><h2>🏭 Coal Fleet Simulator</h2><button class="btn btn-p btn-sm" onclick="runCoalSim()">▶ Calculate</button></div>
      <div class="gsim">
        <div>
          <div class="card" style="position:sticky;top:0">
            <div class="card-title">⚙️ Coal Parameters</div>
            <div class="sep">Equipment</div>
            <div class="fr2">
              <div class="fg"><label>Loader</label><select id="cl-loader">
                <option value="PC2000">PC2000 (715 ton/hr)</option>
                <option value="PC1250" selected>PC1250SP-8 (415 ton/hr)</option>
                <option value="PC1250-11">PC1250SP-11 (315 ton/hr)</option>
                <option value="EX1200">EX1200 (415 ton/hr)</option>
                <option value="PC850">PC850 (245 ton/hr)</option>
              </select></div>
              <div class="fg"><label>N Loaders</label><input type="number" id="cl-nloader" value="1" min="1" max="5"></div>
            </div>
            <div class="fr2">
              <div class="fg"><label>Truck</label><select id="cl-truck">
                <option value="HD785CC" selected>HD785CC (100t)</option>
                <option value="HD785">HD785-7 (55t)</option>
                <option value="HM400">HM400 (40t)</option>
              </select></div>
              <div class="fg"><label>N Trucks</label><input type="number" id="cl-ntruck" value="7" min="1" max="30"></div>
            </div>
            <div class="sep">Haul Road</div>
            <div class="fr2">
              <div class="fg"><label>Dist 1-way (km)</label><input type="number" id="cl-dist" value="18.2" step="0.1"></div>
              <div class="fg"><label>MF Target</label><input type="number" id="cl-mft" value="0.95" step="0.01"></div>
            </div>
            <div class="fr2">
              <div class="fg"><label>Spd Loaded (km/h)</label><input type="number" id="cl-spdl" value="40" step="1"></div>
              <div class="fg"><label>Spd Empty (km/h)</label><input type="number" id="cl-spde" value="60" step="1"></div>
            </div>
            <div class="sep">Operational</div>
            <div class="fr2">
              <div class="fg"><label>PA (%)</label><input type="number" id="cl-pa" value="93" step="0.5"></div>
              <div class="fg"><label>UA (%)</label><input type="number" id="cl-ua" value="62" step="0.5"></div>
            </div>
            <div class="fr2">
              <div class="fg"><label>WH/day (hrs)</label><input type="number" id="cl-wh" value="14" step="0.1"></div>
              <div class="fg"><label>Working Days</label><input type="number" id="cl-days" value="30"></div>
            </div>
            <div class="fr2">
              <div class="fg"><label>Spot (min)</label><input type="number" id="cl-spot" value="0.5" step="0.1"></div>
              <div class="fg"><label>Dump (min)</label><input type="number" id="cl-dump" value="2" step="0.1"></div>
            </div>
            <div class="fr2 fr1"><div class="fg"><label>Monthly Target (ton)</label><input type="number" id="cl-tgt" value="176499" step="1000"></div></div>
            <button class="btn btn-p" style="width:100%;margin-top:8px" onclick="runCoalSim()">▶ Run Coal Simulation</button>
            <button class="btn btn-s" style="width:100%;margin-top:6px" onclick="saveCoalScenario()">💾 Save Scenario</button>
          </div>
        </div>
        <div>
          <div class="g3 mb14">
            <div class="kpi"><div class="kpi-label">🔁 CT Truck</div><div class="kpi-value" id="cl-r-ct" style="color:var(--accent)">—</div><div class="kpi-sub">min/cycle</div></div>
            <div class="kpi"><div class="kpi-label">⚖️ MF</div><div class="kpi-value" id="cl-r-mf" style="color:var(--green)">—</div><div class="kpi-sub" id="cl-r-mf-st">Run sim</div></div>
            <div class="kpi"><div class="kpi-label">🎯 Need DT</div><div class="kpi-value" id="cl-r-needdt" style="color:var(--blue)">—</div><div class="kpi-sub" id="cl-r-needdt-s">—</div></div>
          </div>
          <div class="g3 mb14">
            <div class="kpi"><div class="kpi-label">📦 Loader Prod</div><div class="kpi-value" id="cl-r-lprd" style="color:var(--orange)">—</div><div class="kpi-sub">ton/hr</div></div>
            <div class="kpi"><div class="kpi-label">🚛 Fleet Output</div><div class="kpi-value" id="cl-r-fprd" style="color:var(--green)">—</div><div class="kpi-sub">ton/hr</div></div>
            <div class="kpi"><div class="kpi-label">📅 Monthly</div><div class="kpi-value" id="cl-r-mo" style="color:var(--purple)">—</div><div class="kpi-sub">ton/month</div></div>
          </div>
          <div id="cl-mf-bar-wrap" class="mb14"></div>
          <div class="g2 mb14">
            <div class="card"><div class="card-title">CT Breakdown</div><div class="ch"><canvas id="ch-cl-ct"></canvas></div></div>
            <div class="card"><div class="card-title">MF Sensitivity</div><div class="ch"><canvas id="ch-cl-mf"></canvas></div></div>
          </div>
          <div class="card mb14"><div class="card-title">Target vs Capacity</div><div class="ch-sm"><canvas id="ch-cl-gap"></canvas></div></div>
          <div class="card" id="coal-recs"><div class="card-title">🤖 Coal Recommendations</div><div id="coal-rec-list"></div></div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ PHR ANALYSIS ══════════════════════════════════════════════ -->
    <div class="section" id="tab-phr">
      <div class="shdr"><h2>⚖️ PHR — Strip Ratio & Fleet Requirement Analysis</h2></div>
      <div class="card mb14">
        <div class="card-title">📐 Strip Ratio Calculator</div>
        <div class="g3">
          <div><div class="sep">OB Production</div>
            <div class="fr2 fr1"><div class="fg"><label>OB Target (BCM/month)</label><input type="number" id="phr-ob" value="16659742" step="10000" oninput="calcPHR()"></div></div>
            <div class="fr2"><div class="fg"><label>N OB Loaders</label><input type="number" id="phr-ob-nl" value="37" oninput="calcPHR()"></div><div class="fg"><label>Avg Prdty (bcm/hr)</label><input type="number" id="phr-ob-p" value="850" oninput="calcPHR()"></div></div>
            <div class="fr2"><div class="fg"><label>Avg OB Dist (km)</label><input type="number" id="phr-ob-d" value="3.3" step="0.1" oninput="calcPHR()"></div><div class="fg"><label>N OB DT</label><input type="number" id="phr-ob-dt" value="363" oninput="calcPHR()"></div></div>
          </div>
          <div><div class="sep">Coal Production</div>
            <div class="fr2 fr1"><div class="fg"><label>Coal Target (ton/month)</label><input type="number" id="phr-coal" value="2343836" step="10000" oninput="calcPHR()"></div></div>
            <div class="fr2"><div class="fg"><label>N Coal Loaders</label><input type="number" id="phr-cl-nl" value="14" oninput="calcPHR()"></div><div class="fg"><label>Avg Prdty (ton/hr)</label><input type="number" id="phr-cl-p" value="415" oninput="calcPHR()"></div></div>
            <div class="fr2"><div class="fg"><label>Avg Coal Dist (km)</label><input type="number" id="phr-cl-d" value="16.1" step="0.1" oninput="calcPHR()"></div><div class="fg"><label>N Coal DT</label><input type="number" id="phr-cl-dt" value="91" oninput="calcPHR()"></div></div>
          </div>
          <div><div class="sep">Reference</div>
            <div class="fr2"><div class="fg"><label>Working Days</label><input type="number" id="phr-days" value="30" oninput="calcPHR()"></div><div class="fg"><label>WH/day</label><input type="number" id="phr-wh" value="14.18" step="0.1" oninput="calcPHR()"></div></div>
            <div class="fr2 fr1"><div class="fg"><label>Target SR (BCM/ton)</label><input type="number" id="phr-sr-tgt" value="7.11" step="0.01" oninput="calcPHR()"></div></div>
          </div>
        </div>
      </div>
      <div class="g4 mb14">
        <div class="kpi"><div class="kpi-label">Strip Ratio (SR)</div><div class="kpi-value" id="phr-sr-val" style="color:var(--accent)">—</div><div class="kpi-sub">BCM per ton coal</div></div>
        <div class="kpi"><div class="kpi-label">OB Loader Capacity</div><div class="kpi-value" id="phr-ob-cap" style="color:var(--orange)">—</div><div class="kpi-sub">BCM/month</div></div>
        <div class="kpi"><div class="kpi-label">Coal Loader Capacity</div><div class="kpi-value" id="phr-cl-cap" style="color:var(--blue)">—</div><div class="kpi-sub">ton/month</div></div>
        <div class="kpi"><div class="kpi-label">SR Status</div><div class="kpi-value" id="phr-sr-st" style="font-size:16px">—</div><div class="kpi-sub" id="phr-sr-msg">—</div></div>
      </div>
      <div class="g2 mb14">
        <div class="card"><div class="card-title">SR Visualisation</div>
          <div class="sr-disp">
            <div class="sr-num"><div class="val" id="phr-ob-disp" style="color:var(--orange)">—</div><div class="lbl">BCM OB</div></div>
            <div class="sr-div">÷</div>
            <div class="sr-num"><div class="val" id="phr-cl-disp" style="color:var(--blue)">—</div><div class="lbl">Ton Coal</div></div>
            <div class="sr-div">=</div>
            <div class="sr-num"><div class="val" id="phr-sr-big" style="color:var(--accent)">—</div><div class="lbl">SR</div></div>
          </div>
          <div id="phr-sr-bar-wrap" style="padding:8px 0">
            <div style="font-size:11px;color:var(--text2);margin-bottom:4px">SR deviation from target:</div>
            <div class="prog"><div class="prog-f" id="phr-sr-bar" style="background:var(--green)"></div></div>
          </div>
        </div>
        <div class="card"><div class="card-title">Capacity vs Target</div><div class="ch"><canvas id="ch-phr-cap"></canvas></div></div>
      </div>
      <div class="card mb14"><div class="card-title">Multi-Area PHR Analysis</div>
        <div style="overflow-x:auto"><table class="tbl"><thead><tr>
          <th>Area</th><th>OB BCM/Month</th><th>Coal Ton/Month</th><th>SR</th>
          <th>OB Avg Dist</th><th>Approx OB DT</th><th>Coal Avg Dist</th><th>Approx Coal DT</th><th>SR Status</th>
        </tr></thead><tbody id="phr-area-tbody"></tbody></table></div>
      </div>
      <div class="card"><div class="card-title">SR Sensitivity — Required Fleet vs Strip Ratio</div><div class="ch-lg"><canvas id="ch-phr-sens"></canvas></div></div>
    </div>

    <!-- ══════════════════════════════════════════════ DT TRAFFIC SIMULATOR ══════════════════════════════════════════════ -->
    <div class="section" id="tab-dt-traffic">
      <div class="shdr"><h2>🚦 DT Traffic Density Simulator</h2>
        <div style="display:flex;gap:8px">
          <span class="badge" id="dt-fleet-badge">0 fleet</span>
          <span class="badge badge-blue" id="dt-total-badge">0 DT</span>
        </div>
      </div>
      <div class="g2 mb14">
        <div class="card">
          <div class="card-title">01 · Road & Unit Parameters</div>
          <div class="fr3">
            <div class="fg"><label title="Panjang jalan bersama (km)">Shared Road Length (km)</label><input type="number" id="dt-lshared" value="2.5" step="0.1" oninput="dtFullUpdate()"></div>
            <div class="fg"><label title="Panjang unit HD785 (m)">Truck Length (m)</label><input type="number" id="dt-ltruck" value="8.5" step="0.1" oninput="dtFullUpdate()"></div>
            <div class="fg"><label title="Koefisien gesek jalan">Friction Coef. (μ)</label><input type="number" id="dt-mu" value="0.40" step="0.01" min="0.1" max="0.9" oninput="dtFullUpdate()"></div>
          </div>
          <div class="fr3">
            <div class="fg"><label title="Safety factor pengereman">Safety Factor (SF)</label><input type="number" id="dt-sf" value="1.30" step="0.05" oninput="dtFullUpdate()"></div>
            <div class="fg"><label title="Waktu reaksi pengemudi (detik)">Reaction Time (s)</label><input type="number" id="dt-treact" value="3.0" step="0.5" oninput="dtFullUpdate()"></div>
            <div class="fg"><label title="Safety buffer clearance (m)">Safety Buffer (m)</label><input type="number" id="dt-buffer" value="10" step="1" oninput="dtFullUpdate()"></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">03 · Density Results — Normal Condition</div>
          <div class="g2 mb8">
            <div class="dt-metric"><div class="dm-lbl">Total Truck Density</div><div class="dm-val" id="dt-r-density">—</div><div class="dm-unit">trucks on shared road</div><div class="dm-status" id="dt-r-dens-st">—</div></div>
            <div class="dt-metric"><div class="dm-lbl">Density per Direction</div><div class="dm-val" id="dt-r-dpd">—</div><div class="dm-unit">trucks per direction</div></div>
          </div>
          <div class="g2">
            <div class="dt-metric"><div class="dm-lbl">Following Distance</div><div class="dm-val" id="dt-r-gap">—</div><div class="dm-unit">meters between trucks</div><div class="dm-status" id="dt-r-gap-st">—</div></div>
            <div class="dt-metric"><div class="dm-lbl">Max Safe Speed</div><div class="dm-val" id="dt-r-speed">—</div><div class="dm-unit">km/h (gap ≥40m)</div>
              <div class="spd-track"><div class="spd-fill" id="dt-r-spd-bar" style="width:0%"></div></div></div>
          </div>
          <!-- Road Visualization -->
          <div class="road-vis-wrap mt8">
            <div style="font-size:10px;color:var(--text3);margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px">Road Visualization</div>
            <div class="road-canvas" id="dt-road-canvas">
              <div class="road-lane-l"></div><div class="road-lane-e"></div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:5px">
              <span style="font-size:10px;color:var(--text3);display:flex;align-items:center;gap:4px"><span style="width:10px;height:6px;background:var(--blue);border-radius:1px;display:inline-block"></span>Loaded</span>
              <span id="dt-vis-gap" style="font-size:10px;color:var(--text2);font-family:'Courier New',monospace"></span>
              <span style="font-size:10px;color:var(--text3);display:flex;align-items:center;gap:4px"><span style="width:10px;height:6px;background:var(--surface2);border:1px solid var(--border2);border-radius:1px;display:inline-block"></span>Empty</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb14">
        <div class="card-title">02 · Fleet Configuration</div>
        <div style="overflow-x:auto">
          <table class="dt-fleet-tbl"><thead><tr>
            <th>Fleet Name</th><th>N DT</th><th>Total Distance (km)</th>
            <th>Density Contribution</th><th>% Shared Road</th><th></th>
          </tr></thead><tbody id="dt-fleet-tbody"></tbody></table>
        </div>
        <button class="btn btn-s btn-sm mt8" onclick="dtAddFleet()">+ Add Fleet</button>
        <div class="dt-info-row" id="dt-param-summary"></div>
      </div>

      <div class="g2 mb14">
        <div class="card"><div class="card-title">04 · Density Contribution per Fleet</div><div class="ch"><canvas id="ch-dt-fleet"></canvas></div></div>
        <div class="card">
          <div class="card-title">04 · Speed Sensitivity vs Added DT</div>
          <div class="fg mb8"><label>Sensitivity for Fleet:</label><select id="dt-sens-select" onchange="dtUpdateSens()"></select></div>
          <div class="ch"><canvas id="ch-dt-sens"></canvas></div>
        </div>
      </div>

      <div class="card mb14">
        <div class="card-title">05 · Worst Case — Bunching / Platoon Scenario</div>
        <p style="font-size:11.5px;color:var(--text2);margin-bottom:12px;line-height:1.7">Simulates abnormal cycle: some trucks are delayed at loading/dumping points, causing them to depart as a platoon — increasing local density on shared road.</p>
        <div class="fg mb12" style="max-width:400px">
          <label>% DT with abnormal cycle (delayed): <strong id="dt-abnpct-lbl" style="color:var(--accent)">20%</strong></label>
          <input type="range" id="dt-abnpct" min="0" max="80" step="5" value="20" oninput="dtUpdateWC()" style="width:100%;accent-color:var(--accent)">
        </div>
        <div class="g3">
          <div class="dt-metric"><div class="dm-lbl">Density/Dir (Worst)</div><div class="dm-val" id="dt-wc-dpd">—</div><div class="dm-unit">trucks per direction</div><div style="font-size:10.5px;color:var(--red);margin-top:3px" id="dt-wc-dpd-d"></div></div>
          <div class="dt-metric"><div class="dm-lbl">Following Gap (Worst)</div><div class="dm-val" id="dt-wc-gap">—</div><div class="dm-unit">meters</div><div class="dm-status" id="dt-wc-gap-st">—</div><div style="font-size:10.5px;color:var(--red);margin-top:3px" id="dt-wc-gap-d"></div></div>
          <div class="dt-metric"><div class="dm-lbl">Max Speed (Worst)</div><div class="dm-val" id="dt-wc-spd">—</div><div class="dm-unit">km/h</div><div class="dm-status" id="dt-wc-spd-st">—</div><div style="font-size:10.5px;color:var(--red);margin-top:3px" id="dt-wc-spd-d"></div></div>
        </div>
        <div style="margin-top:12px;padding:10px 12px;background:var(--surface2);border-radius:6px;border-left:3px solid var(--accent)">
          <p id="dt-wc-rec" style="font-size:11.5px;color:var(--text2);line-height:1.7"></p>
        </div>
      </div>

      <div class="card"><div class="card-title">06 · Formula Reference</div>
        <div class="g2" style="font-size:11.5px;color:var(--text2);line-height:1.8">
          <div><p style="color:var(--text);font-weight:600;margin-bottom:4px">Traffic Density</p>
            <p>D = Σ (L<sub>shared</sub> / L<sub>total,i</sub>) × n<sub>DT,i</sub></p>
            <p>D<sub>per dir</sub> = D / 2</p>
            <p>Space/truck = (L<sub>shared</sub> × 1000) / D<sub>per dir</sub></p>
            <p>Following gap = Space/truck − L<sub>truck</sub></p>
          </div>
          <div><p style="color:var(--text);font-weight:600;margin-bottom:4px">Safe Speed</p>
            <p>d<sub>stop</sub> = v·t<sub>react</sub> + v² · SF / (2·g·μ)</p>
            <p>Condition: gap &gt; d<sub>stop</sub> + buffer</p>
            <p>Solve quadratic for v<sub>max</sub></p>
            <p style="color:var(--text3)">g=9.81, SF=safety factor, μ=friction coef.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ FLEET REFERENCE ══════════════════════════════════════════════ -->
    <div class="section" id="tab-fleet-ref">
      <div class="shdr"><h2>📋 Fleet Reference & Specifications</h2></div>
      <div class="card mb14"><div class="card-title">Loader Specifications</div>
        <div style="overflow-x:auto"><table class="tbl"><thead><tr>
          <th>Model</th><th>Prdty OB (bcm/hr)</th><th>Prdty Coal (ton/hr)</th>
          <th>PA(%)</th><th>UA(%)</th><th>WH(hr/day)</th><th>CT Loader(min)</th>
          <th>Fuel(USD/hr)</th><th>Total Cost(USD/hr)</th><th>Category</th>
        </tr></thead><tbody id="ref-loader-tbody"></tbody></table></div>
      </div>
      <div class="card mb14"><div class="card-title">Hauler Specifications</div>
        <div style="overflow-x:auto"><table class="tbl"><thead><tr>
          <th>Model</th><th>Payload OB(t)</th><th>Payload Coal(t)</th><th>BCM/load</th>
          <th>Spd Loaded(km/h)</th><th>Spd Empty(km/h)</th><th>PA(%)</th>
          <th>Fuel(USD/hr)</th><th>Total Cost(USD/hr)</th>
        </tr></thead><tbody id="ref-truck-tbody"></tbody></table></div>
      </div>
      <div class="card mb14"><div class="card-title">Dozer Specifications</div>
        <div style="overflow-x:auto"><table class="tbl"><thead><tr>
          <th>Model</th><th>Power(HP)</th><th>Blade Cap(m³)</th><th>PA(%)</th><th>UA(%)</th>
          <th>Fuel(USD/hr)</th><th>Total Cost(USD/hr)</th><th>Role</th>
        </tr></thead><tbody id="ref-dozer-tbody"></tbody></table></div>
      </div>
      <div class="card mb14"><div class="card-title">Grader Specifications</div>
        <div style="overflow-x:auto"><table class="tbl"><thead><tr>
          <th>Model</th><th>Blade Width(m)</th><th>PA(%)</th><th>UA(%)</th>
          <th>Fuel(USD/hr)</th><th>Total Cost(USD/hr)</th><th>Role</th>
        </tr></thead><tbody id="ref-grader-tbody"></tbody></table></div>
      </div>
      <div class="g2"><div class="card"><div class="card-title">Loader Productivity Comparison</div><div class="ch-lg"><canvas id="ch-ref-loader"></canvas></div></div>
      <div class="card"><div class="card-title">Support Equipment Cost Comparison</div><div class="ch-lg"><canvas id="ch-ref-support"></canvas></div></div></div>
    </div>

    <!-- ══════════════════════════════════════════════ SCENARIO ══════════════════════════════════════════════ -->
    <div class="section" id="tab-scenario">
      <div class="shdr"><h2>🔄 Scenario Comparison</h2><button class="btn btn-r btn-sm" onclick="clearScenarios()">🗑 Clear All</button></div>
      <div id="sc-empty" class="card" style="text-align:center;padding:40px;color:var(--text2)">
        <div style="font-size:36px;margin-bottom:10px">🔄</div>
        <p>No scenarios yet. Run OB/Coal simulator and click "Save Scenario".</p>
      </div>
      <div id="sc-content" style="display:none">
        <div class="card mb14"><div class="card-title">Comparison Table</div><div style="overflow-x:auto"><table class="sctbl" id="sc-tbl"></table></div></div>
        <div class="card"><div class="card-title">Productivity Comparison</div><div class="ch-lg"><canvas id="ch-sc"></canvas></div></div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ COST ANALYSIS ══════════════════════════════════════════════ -->
    <div class="section" id="tab-cost">
      <div class="shdr"><h2>💰 Cost Analysis — Equipment Cost/Hour (Mar 2026)</h2></div>
      <div class="g4 mb14">
        <div class="kpi"><div class="kpi-label">HD785-7 Total</div><div class="kpi-value" style="color:var(--accent)">USD 83</div><div class="kpi-sub">/working hr</div></div>
        <div class="kpi"><div class="kpi-label">EX2600-7 Total</div><div class="kpi-value" style="color:var(--orange)">USD 210</div><div class="kpi-sub">/working hr</div></div>
        <div class="kpi"><div class="kpi-label">D375A-6R Dozer</div><div class="kpi-value" style="color:var(--blue)">USD 130</div><div class="kpi-sub">/working hr</div></div>
        <div class="kpi"><div class="kpi-label">GD825 Grader</div><div class="kpi-value" style="color:var(--green)">USD 55</div><div class="kpi-sub">/working hr</div></div>
      </div>
      <div class="g2 mb14">
        <div class="card"><div class="card-title">Cost Breakdown by Equipment (USD/hr Stacked)</div><div class="ch-lg"><canvas id="ch-cost-break"></canvas></div></div>
        <div class="card">
          <div class="card-title">Cost per BCM/Ton Calculator</div>
          <div class="sep">Fleet Config</div>
          <div class="fr2">
            <div class="fg"><label>Loader</label><select id="cost-loader" onchange="calcCostPerBCM()"><option value="EX2600">EX2600</option><option value="PC2000-11R">PC2000-11R</option><option value="PC2000" selected>PC2000</option><option value="PC1250">PC1250SP-8</option></select></div>
            <div class="fg"><label>N Loaders</label><input type="number" id="cost-nl" value="1" oninput="calcCostPerBCM()"></div>
          </div>
          <div class="fr2">
            <div class="fg"><label>N Trucks (HD785)</label><input type="number" id="cost-nt" value="7" oninput="calcCostPerBCM()"></div>
            <div class="fg"><label>N Dozer</label><input type="number" id="cost-nd" value="1" oninput="calcCostPerBCM()"></div>
          </div>
          <div class="fr2">
            <div class="fg"><label>Dozer Type</label><select id="cost-dtype" onchange="calcCostPerBCM()"><option value="D375">D375A-6R (USD 130)</option><option value="D155" selected>D155A-6R (USD 85)</option><option value="D85">D85ESS2 (USD 65)</option></select></div>
            <div class="fg"><label>N Grader</label><input type="number" id="cost-ng" value="0" oninput="calcCostPerBCM()"></div>
          </div>
          <div class="fr2 fr1"><div class="fg"><label>Fleet BCM/hr</label><input type="number" id="cost-prdty" value="700" oninput="calcCostPerBCM()"></div></div>
          <div class="sep">Result</div>
          <table class="tbl">
            <tr><td>Loader Cost/hr</td><td id="cost-lhr" style="font-weight:700;color:var(--orange)">—</td></tr>
            <tr><td>Truck Cost/hr</td><td id="cost-thr" style="font-weight:700;color:var(--accent)">—</td></tr>
            <tr><td>Dozer Cost/hr</td><td id="cost-dhr" style="font-weight:700;color:var(--blue)">—</td></tr>
            <tr><td>Grader Cost/hr</td><td id="cost-ghr" style="font-weight:700;color:var(--green)">—</td></tr>
            <tr><td><strong>Total Fleet/hr</strong></td><td id="cost-tot" style="font-weight:700;color:var(--green);font-size:15px">—</td></tr>
            <tr><td><strong>Cost per BCM</strong></td><td id="cost-pbcm" style="font-weight:800;font-size:18px;color:var(--accent)">—</td></tr>
          </table>
        </div>
      </div>
      <div class="card mb14"><div class="card-title">Equipment Cost Detail — Monthly Report (KPCS Mar 2026)</div>
        <div style="overflow-x:auto"><table class="tbl" id="cost-detail-tbl"><thead><tr>
          <th>Equipment</th><th>Category</th><th>WHRS</th><th>Depreciation</th>
          <th>Fuel</th><th>W/Shop Station</th><th>Spareparts</th><th>Oil</th>
          <th>Total Cost/hr</th>
        </tr></thead><tbody id="cost-detail-tbody"></tbody></table></div>
      </div>
      <div class="card"><div class="card-title">Monthly Cost Estimate — Full Fleet</div><div class="ch-lg"><canvas id="ch-cost-monthly"></canvas></div></div>
    </div>

    <!-- ══════════════════════════════════════════════ MONTHLY REPORT ══════════════════════════════════════════════ -->
    <div class="section" id="tab-report">
      <div class="shdr">
        <h2>📊 Monthly Fleet Setting Report</h2>
        <div style="display:flex;gap:8px">
          <button class="btn btn-p btn-sm no-print" onclick="window.print()">🖨️ Print / PDF</button>
          <button class="btn btn-s btn-sm no-print" onclick="exportReport()">⬇️ Export Data</button>
        </div>
      </div>
      <div class="card mb14 rep-section">
        <div class="rep-title">MINEFLOW AI — Monthly Fleet Setting Report</div>
        <div class="g2" style="font-size:12.5px">
          <div><p class="mb4"><strong>Site:</strong> KPCS (Kaltim Prima Coal Site)</p>
            <p class="mb4"><strong>Period:</strong> December 2025</p>
            <p class="mb4"><strong>Generated:</strong> <span id="rep-date"></span></p>
            <p class="mb4"><strong>Weather Loss:</strong> <span id="rep-wx">—</span></p></div>
          <div><p class="mb4"><strong>OB Target:</strong> <span id="rep-ob-tgt">16,659,742 BCM/month</span></p>
            <p class="mb4"><strong>Coal Target:</strong> <span id="rep-cl-tgt">2,343,836 ton/month</span></p>
            <p class="mb4"><strong>SR:</strong> <span id="rep-sr">7.11 BCM/ton</span></p>
            <p class="mb4"><strong>Total DT:</strong> <span id="rep-total-dt">—</span></p></div>
        </div>
      </div>
      <div class="card mb14 rep-section"><div class="rep-title">OB Fleet Summary</div>
        <table class="tbl"><thead><tr><th>Area/Pit</th><th>EGI Loader</th><th>N Loader</th><th>N DT</th><th>Dist(km)</th><th>PA</th><th>UA</th><th>MF</th><th>Need DT</th><th>Monthly BCM</th><th>Status</th></tr></thead>
        <tbody id="rep-ob-tbody"></tbody></table>
      </div>
      <div class="card mb14 rep-section"><div class="rep-title">Coal Fleet Summary</div>
        <table class="tbl"><thead><tr><th>Area/Pit</th><th>EGI Loader</th><th>N Loader</th><th>N DT</th><th>Dist(km)</th><th>PA</th><th>UA</th><th>MF</th><th>Need DT</th><th>Monthly Ton</th><th>Status</th></tr></thead>
        <tbody id="rep-coal-tbody"></tbody></table>
      </div>
      <div class="card mb14 rep-section"><div class="rep-title">Support Equipment Summary</div>
        <table class="tbl"><thead><tr><th>Area</th><th>Equipment</th><th>Units</th><th>PA</th><th>UA</th><th>Role</th><th>Cost/hr</th><th>Monthly Cost</th></tr></thead>
        <tbody id="rep-support-tbody"></tbody></table>
      </div>
      <div class="card rep-section"><div class="rep-title">Weather & Operational Summary</div>
        <div class="g3" id="rep-weather" style="font-size:12.5px;gap:20px"></div>
      </div>
    </div>

  </div><!-- /content -->
</div><!-- /main -->





<script>
// ═══════════════════════════════════════════════════════════════════════
// DATA CONSTANTS (from real operational data KPCS Dec 2025)
// ═══════════════════════════════════════════════════════════════════════

const LOADERS = {
  'EX2600':    {name:'EX2600-7',    prdty_ob:1200, prdty_coal:0,   pa:0.94,  ua:0.6284, wh:14.18, ct:3.09, fuel:89.63, cost:210, cat:'OB',   density:1.78},
  'PC3400':    {name:'PC3400',      prdty_ob:1350, prdty_coal:0,   pa:0.94,  ua:0.6284, wh:14.18, ct:2.5,  fuel:0,     cost:280, cat:'OB',   density:1.78},
  'PC2000-11R':{name:'PC2000-11R',  prdty_ob:950,  prdty_coal:0,   pa:0.94,  ua:0.6284, wh:14.18, ct:3.5,  fuel:60.16, cost:166, cat:'OB',   density:1.78},
  'PC2000':    {name:'PC2000',      prdty_ob:800,  prdty_coal:715, pa:0.92,  ua:0.6067, wh:13.4,  ct:4.0,  fuel:57.45, cost:110, cat:'BOTH', density:1.78},
  'PC1250':    {name:'PC1250SP-8',  prdty_ob:525,  prdty_coal:415, pa:0.915, ua:0.6046, wh:13.28, ct:5.5,  fuel:40.40, cost:97,  cat:'BOTH', density:1.78},
  'PC1250-11': {name:'PC1250SP-11', prdty_ob:525,  prdty_coal:315, pa:0.9098,ua:0.6023, wh:13.15, ct:5.5,  fuel:35.37, cost:100, cat:'COAL', density:1.78},
  'EX1200':    {name:'EX1200',      prdty_ob:525,  prdty_coal:415, pa:0.94,  ua:0.6284, wh:14.18, ct:5.0,  fuel:46.91, cost:75,  cat:'BOTH', density:1.78},
  'PC850':     {name:'PC850SP-8',   prdty_ob:350,  prdty_coal:245, pa:0.911, ua:0.6028, wh:13.18, ct:7.0,  fuel:23.47, cost:55,  cat:'COAL', density:1.78},
};

const TRUCKS = {
  'HD785':  {name:'HD785-7',    pl_ob:91,  pl_coal:55,  pa:0.92, ua:0.83, fuel:34.03, cost:83,  sl_ob:18, se_ob:25, sl_cl:40, se_cl:60},
  'HD785CC':{name:'HD785-7CC',  pl_ob:91,  pl_coal:100, pa:0.92, ua:0.83, fuel:26.42, cost:65,  sl_ob:18, se_ob:25, sl_cl:40, se_cl:60},
  'HM400':  {name:'HM400',      pl_ob:40,  pl_coal:40,  pa:0.91, ua:0.82, fuel:25,    cost:60,  sl_ob:18, se_ob:28, sl_cl:35, se_cl:55},
};

const DOZERS = [
  {name:'D375A-6R', power:508, blade:18.5, pa:0.92, ua:0.78, fuel:55, cost:130, role:'Spreader/Push OB'},
  {name:'D155A-6R', power:228, blade:8.0,  pa:0.91, ua:0.77, fuel:35, cost:85,  role:'Spreader/Compactor'},
  {name:'D85ESS2',  power:167, blade:4.5,  pa:0.90, ua:0.76, fuel:28, cost:65,  role:'Cleanup/Stockpile'},
  {name:'D275A-5R', power:295, blade:12.5, pa:0.91, ua:0.77, fuel:42, cost:100, role:'Ramp Maintenance'},
];

const GRADERS = [
  {name:'GD825A-2', blade:4.88, pa:0.91, ua:0.76, fuel:22, cost:55, role:'Road Maintenance'},
  {name:'GD655-6',  blade:4.27, pa:0.90, ua:0.75, fuel:18, cost:45, role:'Road Grading'},
  {name:'GD521A',   blade:3.66, pa:0.89, ua:0.74, fuel:15, cost:38, role:'Light Grading'},
];

const COST_DATA = [
  {egi:'HD785-7',       cat:'Hauler',  whrs:130472, depre:20.73, fuel:34.03, ws:1.78,  sp:8.07,  oil:1.45, total:57.85},
  {egi:'HD785-7CC',     cat:'Hauler',  whrs:32946,  depre:19.66, fuel:26.42, ws:1.64,  sp:7.83,  oil:1.48, total:48.51},
  {egi:'PC2000 (OB)',   cat:'Loader',  whrs:6001,   depre:10.97, fuel:57.45, ws:5.75,  sp:32.66, oil:3.78, total:100.15},
  {egi:'PC2000-11R',    cat:'Loader',  whrs:2747,   depre:79.03, fuel:60.16, ws:3.49,  sp:20.18, oil:5.75, total:91.05},
  {egi:'PC1250SP-8',    cat:'Loader',  whrs:1723,   depre:0,     fuel:40.40, ws:7.88,  sp:45.55, oil:2.89, total:97.00},
  {egi:'PC1250SP-11',   cat:'Loader',  whrs:4982,   depre:39.31, fuel:35.37, ws:2.53,  sp:12.43, oil:4.20, total:54.78},
  {egi:'EX2600-7',      cat:'Loader',  whrs:7223,   depre:67.26, fuel:89.63, ws:9.40,  sp:52.36, oil:12.86,total:165.25},
  {egi:'EX1200',        cat:'Loader',  whrs:1286,   depre:0,     fuel:46.91, ws:2.83,  sp:16.35, oil:2.69, total:69.24},
  {egi:'PC850SP-8',     cat:'Loader',  whrs:3629,   depre:17.57, fuel:23.47, ws:4.81,  sp:23.14, oil:0.77, total:54.53},
  {egi:'D375A-6R',      cat:'Dozer',   whrs:1200,   depre:40.00, fuel:55.00, ws:8.00,  sp:22.00, oil:5.00, total:130.00},
  {egi:'D155A-6R',      cat:'Dozer',   whrs:2800,   depre:20.00, fuel:35.00, ws:5.00,  sp:20.00, oil:5.00, total:85.00},
  {egi:'D85ESS2',       cat:'Dozer',   whrs:980,    depre:15.00, fuel:28.00, ws:4.00,  sp:14.00, oil:4.00, total:65.00},
  {egi:'GD825A-2',      cat:'Grader',  whrs:1100,   depre:12.00, fuel:22.00, ws:6.00,  sp:11.00, oil:4.00, total:55.00},
  {egi:'GD655-6',       cat:'Grader',  whrs:900,    depre:10.00, fuel:18.00, ws:4.50,  sp:9.00,  oil:3.50, total:45.00},
];

// Real area data from Dec 2025 plan
const OB_AREAS = [
  {area:'PA1',pit:'PDE',     loader:'PC2000',    nl:1, dist:3.77, prdty:800,  hari:30, mf_s:0.95, mf_a:0.929, needdt:14, prod:379662},
  {area:'PA1',pit:'PDNE',    loader:'EX2600',    nl:3, dist:2.20, prdty:1200, hari:30, mf_s:0.95, mf_a:0.988, needdt:19, prod:990616},
  {area:'PA1',pit:'PDWN Aus',loader:'EX2600',    nl:7, dist:2.77, prdty:1080, hari:30, mf_s:0.95, mf_a:0.978, needdt:70, prod:5306007},
  {area:'PA2',pit:'PDWN Am', loader:'EX2600',    nl:2, dist:5.60, prdty:1080, hari:30, mf_s:0.95, mf_a:0.946, needdt:25, prod:1200000},
  {area:'PA2',pit:'PDWN Af', loader:'PC2000-11R',nl:3, dist:3.20, prdty:950,  hari:30, mf_s:0.95, mf_a:1.010, needdt:24, prod:1500000},
  {area:'PA2',pit:'PDWN As', loader:'PC3400',    nl:1, dist:3.00, prdty:1350, hari:30, mf_s:0.95, mf_a:1.009, needdt:11, prod:900000},
  {area:'PA3',pit:'Various', loader:'PC2000',    nl:5, dist:3.75, prdty:800,  hari:30, mf_s:0.95, mf_a:0.934, needdt:56, prod:2258724},
  {area:'PA4',pit:'SPE2-3',  loader:'PC2000',    nl:13,dist:4.60, prdty:800,  hari:30, mf_s:0.95, mf_a:0.941, needdt:98, prod:3439097},
];

const COAL_AREAS = [
  {area:'A1',pit:'PDNE',loader:'PC1250',nl:1,dist:19.9,prdty:415,pl:55,truck:'HD785',hari:30,mf_s:0.95,mf_a:0.858,needdt:6,prod:60604},
  {area:'A1',pit:'PDWN',loader:'PC1250',nl:4,dist:18.2,prdty:415,pl:55,truck:'HD785CC',hari:30,mf_s:0.95,mf_a:0.926,needdt:28,prod:532499},
  {area:'A1',pit:'PDWN PC2000',loader:'PC2000',nl:2,dist:18.1,prdty:715,pl:91,truck:'HD785CC',hari:30,mf_s:0.95,mf_a:0.887,needdt:21,prod:539631},
  {area:'A1',pit:'PDWM',loader:'PC1250',nl:1,dist:9.3,prdty:415,pl:55,truck:'HD785',hari:30,mf_s:0.95,mf_a:0.940,needdt:4,prod:82917},
  {area:'A1',pit:'PDWS',loader:'PC1250',nl:1,dist:8.2,prdty:415,pl:55,truck:'HD785',hari:30,mf_s:0.95,mf_a:1.033,needdt:4,prod:158850},
  {area:'A1',pit:'PSE',loader:'EX1200',nl:1,dist:9.5,prdty:415,pl:55,truck:'HD785',hari:30,mf_s:0.95,mf_a:0.693,needdt:3,prod:48945},
  {area:'A2',pit:'SPE2-3',loader:'PC1250-11',nl:4,dist:22.0,prdty:315,pl:55,truck:'HD785',hari:30,mf_s:0.95,mf_a:0.553,needdt:13,prod:321350},
];

// State
let scenarios = [];
let charts = {};
let dtFleets = [{id:1,name:'Fleet OB-A',ndt:12,dist:8.5},{id:2,name:'Fleet Coal-B',ndt:8,dist:6.0}];
let dtNextId = 3;
let monthlyOB = [], monthlyCoal = [], monthlySupport = [];
let wxData = {rain:75.7, slip:43.4, haze:0, delay:215, days:30};

// ═══════════════════════════════════════════════════════════════════════
// MATH UTILITIES
// ═══════════════════════════════════════════════════════════════════════
const r0=n=>Math.round(n), r1=n=>Math.round(n*10)/10, r2=n=>Math.round(n*100)/100, r3=n=>Math.round(n*1000)/1000;
const fmt=n=>Math.round(n).toLocaleString('id-ID');
const fmtK=n=>n>=1e6?r1(n/1e6)+'M':n>=1e3?r1(n/1e3)+'K':r0(n);

// ═══════════════════════════════════════════════════════════════════════
// CORE ENGINEERING ENGINE
// ═══════════════════════════════════════════════════════════════════════
function calcCT(p) {
  // p: {lk,tk,nl,nt,dist,spdl,spde,spot,dump,mft,pa,ua,wh,days,is_coal,tgt}
  const L = LOADERS[p.lk], T = TRUCKS[p.tk];
  if(!L||!T) return null;
  const pl_ton = p.is_coal ? T.pl_coal : T.pl_ob;
  const prdty  = p.is_coal ? (L.prdty_coal||L.prdty_ob) : L.prdty_ob;
  const ctl    = (pl_ton / prdty) * 60;  // CT loader: time to fill one truck
  const tl     = (p.dist / p.spdl) * 60;
  const te     = (p.dist / p.spde) * 60;
  const base   = ctl + p.spot + tl + p.dump + te;
  const mfp    = (p.nt * ctl) / base;
  const queue  = Math.max(0, (mfp - 1.0) * ctl * 0.55);
  const total  = base + queue;
  const mf     = r3((p.nt * ctl) / total);
  const needdt = Math.ceil(p.mft * total / ctl);
  const opt    = Math.round(total / ctl);
  // Productivity
  const pa=p.pa/100, ua=p.ua/100;
  const l_prd  = prdty * pa * ua * p.nl;
  const trips  = 60/total;
  const t_prd_1= trips * pl_ton * T.pa * T.ua;
  const fleet_t= t_prd_1 * p.nt;
  const eff    = Math.min(l_prd, fleet_t);
  const daily  = eff * p.wh;
  const monthly= daily * p.days;
  const lcost  = L.cost * p.nl, tcost = T.cost * p.nt;
  const cpunit = eff>0 ? r2((lcost+tcost)/eff) : 0;
  return {ctl:r2(ctl),tl:r2(tl),te:r2(te),spot:r2(p.spot),dump:r2(p.dump),queue:r2(queue),total:r2(total),
    mf,needdt,opt,pl_ton,prdty,
    l_prd:r1(l_prd), fleet_t:r1(fleet_t), eff:r1(eff),
    daily:r0(daily), monthly:r0(monthly), trips:r3(trips),
    lcost, tcost, cpunit, bottleneck: l_prd<fleet_t?'LOADER':'TRUCK'};
}

function mfColor(mf){
  if(mf<0.90) return '#ef4444';
  if(mf>1.10) return '#f97316';
  if(mf>=0.95&&mf<=1.05) return '#22c55e';
  return '#3b82f6';
}
function mfStatus(mf){
  if(mf<0.90) return {lbl:'LOADER WAITING',cls:'crit',icon:'⚠️'};
  if(mf>1.10) return {lbl:'QUEUE RISK',cls:'warn',icon:'🚨'};
  if(mf>=0.95&&mf<=1.05) return {lbl:'OPTIMAL',cls:'ok',icon:'✓'};
  return {lbl:'ACCEPTABLE',cls:'info',icon:'ℹ️'};
}

function sensitivityData(p) {
  return Array.from({length:16},(_,i)=>{
    const ct=calcCT({...p,nt:i+1});
    return ct?{n:i+1,mf:ct.mf,prd:ct.eff,ct:ct.total}:{n:i+1,mf:0,prd:0,ct:0};
  });
}

// ═══════════════════════════════════════════════════════════════════════
// WEATHER CALCULATION
// ═══════════════════════════════════════════════════════════════════════
function calcWeather() {
  const rain  = parseFloat(document.getElementById('wx-rain').value)||0;
  const slip  = parseFloat(document.getElementById('wx-slip').value)||0;
  const haze  = parseFloat(document.getElementById('wx-haze').value)||0;
  const delay = parseFloat(document.getElementById('wx-delay').value)||0;
  const days  = parseInt(document.getElementById('wx-days').value)||30;
  const base_pa = 0.94, base_ua = 0.6284;
  const total_hrs = days * 24;
  const wh_base = base_pa * base_ua * 24;
  const weather_loss = rain + slip + haze;
  const delay_hrs = (delay / 60) * days;
  const loss_per_day = weather_loss / days;
  const delay_per_day = delay_hrs / days;
  const wh_eff = Math.max(0, wh_base - loss_per_day - delay_per_day);
  const ua_adj = r2(wh_eff / (base_pa * 24) * 100);
  const wh_monthly = r0(wh_eff * days);
  const eff_pct = r1(wh_eff / 24 * 100);
  const total_loss = weather_loss + delay_hrs;

  const setEl = (id,txt) => { const e=document.getElementById(id); if(e) e.textContent=txt; };
  setEl('wx-wh', r2(wh_eff));
  setEl('wx-wh-monthly', wh_monthly);
  setEl('wx-ua-adj', ua_adj);
  setEl('wx-eff-pct', eff_pct);
  setEl('wx-loss', r0(total_loss));
  setEl('wx-days-impact', \`\${days} days\`);

  const impacts = [
    ['wx-rain-impact',  rain,  '-'+r1(rain/days)+'h/day'],
    ['wx-slip-impact',  slip,  '-'+r1(slip/days)+'h/day'],
    ['wx-haze-impact',  haze,  haze>0?'-'+r1(haze/days)+'h/day':'No impact'],
    ['wx-delay-impact', delay_hrs, '-'+r1(delay_per_day)+'h/day'],
  ];
  impacts.forEach(([id,val,txt])=>{
    const e=document.getElementById(id);
    if(e){e.textContent=txt;e.className=val>0?'weather-impact neg':'weather-impact ok';}
  });

  // Warning
  const warnEl=document.getElementById('wx-warning');
  const warnMsg=document.getElementById('wx-warning-msg');
  if(weather_loss > 150 || wh_eff < 10) {
    warnEl.style.display='block';
    warnMsg.textContent=\` Weather/delay loss of \${r0(total_loss)} hrs/month reduces WH to \${r2(wh_eff)} hrs/day (\${eff_pct}% efficiency). Consider weather contingency plan.\`;
  } else { warnEl.style.display='none'; }

  wxData = {rain,slip,haze,delay,days,wh_eff,ua_adj,wh_monthly,eff_pct,total_loss};
  recalcMonthlyUA();
  return {wh_eff, ua_adj, days};
}

function recalcMonthlyUA() {
  // Auto-update UA in monthly fleet tables based on weather
  if(!wxData.ua_adj) return;
  document.querySelectorAll('.m-ua-cell').forEach(el=>{
    const base_ua = parseFloat(el.getAttribute('data-base-ua'))||62.8;
    const adj = Math.min(base_ua, wxData.ua_adj);
    el.value = r2(adj);
  });
  recalcMonthlyTotals();
}

// ═══════════════════════════════════════════════════════════════════════
// MONTHLY FLEET TABLE
// ═══════════════════════════════════════════════════════════════════════
function getLoaderOptions(isCoal) {
  return Object.entries(LOADERS)
    .filter(([k,v])=>isCoal ? v.cat!=='OB' : v.cat!=='COAL')
    .map(([k,v])=>\`<option value="\${k}">\${v.name} (\${isCoal?v.prdty_coal+'t':v.prdty_ob+' bcm'}/hr)</option>\`)
    .join('');
}

function addOBRow(preset) {
  const wx = calcWeather();
  const id = Date.now() + Math.random();
  const p = preset || {area:'PA1',loader:'PC2000',nl:1,prdty:800,pa:94,ua:r2(wxData.ua_adj||62.8),dist:3.0,nt:7};
  monthlyOB.push({id,...p});
  renderOBTable();
  recalcMonthlyTotals();
}

function addCoalRow(preset) {
  const id = Date.now() + Math.random();
  const p = preset || {area:'Area1',loader:'PC1250',nl:1,prdty:415,pa:93,ua:r2(wxData.ua_adj||62),dist:18.0,nt:7};
  monthlyCoal.push({id,...p});
  renderCoalTable();
  recalcMonthlyTotals();
}

function addSupportRow(preset) {
  const id = Date.now() + Math.random();
  const p = preset || {area:'PA1',type:'D155',n:3,pa:91,ua:77,role:'Spreader',cost:85};
  monthlySupport.push({id,...p});
  renderSupportTable();
}

function renderOBTable() {
  const tbody = document.getElementById('ob-fleet-tbody');
  if(!tbody) return;
  tbody.innerHTML = monthlyOB.map((row,idx)=>{
    const L = LOADERS[row.loader]||LOADERS['PC2000'];
    const prdty_eff = row.prdty * (row.pa/100) * (row.ua/100) * row.nl;
    const days = parseInt(document.getElementById('wx-days')?.value)||30;
    const wh = wxData.wh_eff||14.18;
    // CT loader
    const ctl = (91/1.78/row.prdty)*60;
    const ct_truck = ctl + 0.5 + (row.dist/18)*60 + 2 + (row.dist/25)*60;
    const mf = r3((row.nt * ctl) / ct_truck);
    const needdt = Math.ceil(0.95 * ct_truck / ctl);
    const monthly = r0(prdty_eff * wh * days);
    const st = mfStatus(mf);
    return \`<tr>
      <td style="color:var(--text3);font-size:11px">\${idx+1}</td>
      <td><input type="text" value="\${row.area}" oninput="monthlyOB[\${idx}].area=this.value" style="min-width:60px;font-size:11.5px"></td>
      <td><select onchange="monthlyOB[\${idx}].loader=this.value;monthlyOB[\${idx}].prdty=LOADERS[this.value]?.prdty_ob||800;this.closest('tr').querySelector('.m-prdty').value=LOADERS[this.value]?.prdty_ob||800;recalcOBRow(\${idx})" style="font-size:11.5px;width:100%">\${getLoaderOptions(false).replace(\`value="\${row.loader}"\`,\`value="\${row.loader}" selected\`)}</select></td>
      <td><input type="number" value="\${row.nl}" min="1" max="10" oninput="monthlyOB[\${idx}].nl=+this.value;recalcOBRow(\${idx})" style="width:50px;font-size:11.5px"></td>
      <td><input type="number" class="m-prdty" value="\${row.prdty}" oninput="monthlyOB[\${idx}].prdty=+this.value;recalcOBRow(\${idx})" style="width:65px;font-size:11.5px"></td>
      <td><input type="number" value="\${row.pa}" min="50" max="100" step="0.5" oninput="monthlyOB[\${idx}].pa=+this.value;recalcOBRow(\${idx})" style="width:50px;font-size:11.5px"></td>
      <td><input type="number" class="m-ua-cell" data-base-ua="\${L.ua*100}" value="\${row.ua}" min="30" max="90" step="0.5" oninput="monthlyOB[\${idx}].ua=+this.value;recalcOBRow(\${idx})" style="width:50px;font-size:11.5px"></td>
      <td><input type="number" value="\${row.dist}" min="0.5" max="20" step="0.1" oninput="monthlyOB[\${idx}].dist=+this.value;recalcOBRow(\${idx})" style="width:55px;font-size:11.5px"></td>
      <td><input type="number" value="\${row.nt}" min="1" max="30" oninput="monthlyOB[\${idx}].nt=+this.value;recalcOBRow(\${idx})" style="width:45px;font-size:11.5px"></td>
      <td id="ob-r-mf-\${idx}" style="font-weight:700;color:\${mfColor(mf)}">\${mf}</td>
      <td id="ob-r-ndt-\${idx}" style="font-weight:700;color:var(--blue)">\${needdt}</td>
      <td id="ob-r-mon-\${idx}" style="font-weight:600;color:var(--green)">\${fmtK(monthly)}</td>
      <td id="ob-r-st-\${idx}"><span class="status \${st.cls}">\${st.lbl.split(' ')[0]}</span></td>
      <td><button class="btn btn-r btn-sm" onclick="removeOBRow(\${idx})">✕</button></td>
    </tr>\`;
  }).join('');
}

function recalcOBRow(idx) { renderOBTable(); recalcMonthlyTotals(); }

function removeOBRow(idx) { monthlyOB.splice(idx,1); renderOBTable(); recalcMonthlyTotals(); }

function renderCoalTable() {
  const tbody = document.getElementById('coal-fleet-tbody');
  if(!tbody) return;
  tbody.innerHTML = monthlyCoal.map((row,idx)=>{
    const L = LOADERS[row.loader]||LOADERS['PC1250'];
    const prdty_eff = row.prdty * (row.pa/100) * (row.ua/100) * row.nl;
    const days = parseInt(document.getElementById('wx-days')?.value)||30;
    const wh = wxData.wh_eff||14;
    const ctl = (55/row.prdty)*60;
    const ct_truck = ctl + 0.5 + (row.dist/40)*60 + 2 + (row.dist/60)*60;
    const mf = r3((row.nt * ctl) / ct_truck);
    const needdt = Math.ceil(0.95 * ct_truck / ctl);
    const monthly = r0(prdty_eff * wh * days);
    const st = mfStatus(mf);
    return \`<tr>
      <td style="color:var(--text3);font-size:11px">\${idx+1}</td>
      <td><input type="text" value="\${row.area}" oninput="monthlyCoal[\${idx}].area=this.value" style="min-width:55px;font-size:11.5px"></td>
      <td><select onchange="monthlyCoal[\${idx}].loader=this.value;recalcCoalRow(\${idx})" style="font-size:11.5px;width:100%">\${getLoaderOptions(true).replace(\`value="\${row.loader}"\`,\`value="\${row.loader}" selected\`)}</select></td>
      <td><input type="number" value="\${row.nl}" min="1" max="5" oninput="monthlyCoal[\${idx}].nl=+this.value;recalcCoalRow(\${idx})" style="width:45px;font-size:11.5px"></td>
      <td><input type="number" value="\${row.prdty}" oninput="monthlyCoal[\${idx}].prdty=+this.value;recalcCoalRow(\${idx})" style="width:60px;font-size:11.5px"></td>
      <td><input type="number" value="\${row.pa}" min="50" max="100" step="0.5" oninput="monthlyCoal[\${idx}].pa=+this.value;recalcCoalRow(\${idx})" style="width:45px;font-size:11.5px"></td>
      <td><input type="number" class="m-ua-cell" data-base-ua="\${L.ua*100}" value="\${row.ua}" min="30" max="90" step="0.5" oninput="monthlyCoal[\${idx}].ua=+this.value;recalcCoalRow(\${idx})" style="width:45px;font-size:11.5px"></td>
      <td><input type="number" value="\${row.dist}" min="1" max="35" step="0.1" oninput="monthlyCoal[\${idx}].dist=+this.value;recalcCoalRow(\${idx})" style="width:55px;font-size:11.5px"></td>
      <td><input type="number" value="\${row.nt}" min="1" max="30" oninput="monthlyCoal[\${idx}].nt=+this.value;recalcCoalRow(\${idx})" style="width:45px;font-size:11.5px"></td>
      <td id="cl-r-mf-\${idx}" style="font-weight:700;color:\${mfColor(mf)}">\${mf}</td>
      <td id="cl-r-ndt-\${idx}" style="font-weight:700;color:var(--blue)">\${needdt}</td>
      <td id="cl-r-mon-\${idx}" style="font-weight:600;color:var(--green)">\${fmtK(monthly)}</td>
      <td id="cl-r-st-\${idx}"><span class="status \${st.cls}">\${st.lbl.split(' ')[0]}</span></td>
      <td><button class="btn btn-r btn-sm" onclick="removeCoalRow(\${idx})">✕</button></td>
    </tr>\`;
  }).join('');
}
function recalcCoalRow(idx){renderCoalTable();recalcMonthlyTotals();}
function removeCoalRow(idx){monthlyCoal.splice(idx,1);renderCoalTable();recalcMonthlyTotals();}

function renderSupportTable() {
  const TYPES = {D375:{n:'D375A-6R',c:130},D155:{n:'D155A-6R',c:85},D85:{n:'D85ESS2',c:65},GD825:{n:'GD825A-2',c:55},GD655:{n:'GD655-6',c:45}};
  const tbody = document.getElementById('support-tbody');
  if(!tbody) return;
  const days=parseInt(document.getElementById('wx-days')?.value)||30;
  const wh=wxData.wh_eff||14.18;
  tbody.innerHTML = monthlySupport.map((row,idx)=>{
    const T=TYPES[row.type]||TYPES['D155'];
    const mc=r0(T.c * row.n * row.pa/100 * row.ua/100 * wh * days);
    return \`<tr>
      <td style="color:var(--text3)">\${idx+1}</td>
      <td><input type="text" value="\${row.area}" oninput="monthlySupport[\${idx}].area=this.value" style="width:70px;font-size:11.5px"></td>
      <td><select onchange="monthlySupport[\${idx}].type=this.value;renderSupportTable()" style="font-size:11.5px">
        <option value="D375" \${row.type==='D375'?'selected':''}>D375A-6R (USD130)</option>
        <option value="D155" \${row.type==='D155'?'selected':''}>D155A-6R (USD85)</option>
        <option value="D85"  \${row.type==='D85'?'selected':''}>D85ESS2 (USD65)</option>
        <option value="GD825"\${row.type==='GD825'?'selected':''}>GD825 Grader (USD55)</option>
        <option value="GD655"\${row.type==='GD655'?'selected':''}>GD655 Grader (USD45)</option>
      </select></td>
      <td><input type="number" value="\${row.n}" min="1" max="20" oninput="monthlySupport[\${idx}].n=+this.value;renderSupportTable()" style="width:45px;font-size:11.5px"></td>
      <td><input type="number" value="\${row.pa}" min="50" max="100" oninput="monthlySupport[\${idx}].pa=+this.value;renderSupportTable()" style="width:45px;font-size:11.5px"></td>
      <td><input type="number" value="\${row.ua}" min="30" max="90" oninput="monthlySupport[\${idx}].ua=+this.value;renderSupportTable()" style="width:45px;font-size:11.5px"></td>
      <td><input type="text" value="\${row.role}" oninput="monthlySupport[\${idx}].role=this.value" style="width:100px;font-size:11.5px"></td>
      <td style="color:var(--accent);font-weight:600">USD \${T.c}</td>
      <td style="color:var(--green);font-weight:600">\${fmt(mc)}</td>
      <td><span class="status ok">ACTIVE</span></td>
      <td><button class="btn btn-r btn-sm" onclick="monthlySupport.splice(\${idx},1);renderSupportTable()">✕</button></td>
    </tr>\`;
  }).join('');
}

function recalcMonthlyTotals() {
  const days=parseInt(document.getElementById('wx-days')?.value)||30;
  const wh=wxData.wh_eff||14.18;
  let totalOBBCM=0, totalNDT=0, totalNeedDT=0;
  let totalPa=0, totalUa=0, count=0;
  monthlyOB.forEach((row,idx)=>{
    const prdty_eff = row.prdty*(row.pa/100)*(row.ua/100)*row.nl;
    const monthly=r0(prdty_eff*wh*days);
    totalOBBCM+=monthly;
    totalNDT+=row.nt;
    const ctl=(91/1.78/row.prdty)*60;
    const ct_t=ctl+0.5+(row.dist/18)*60+2+(row.dist/25)*60;
    totalNeedDT+=Math.ceil(0.95*ct_t/ctl);
    totalPa+=row.pa; totalUa+=row.ua; count++;
  });
  let totalCoalTon=0, totalClNDT=0, totalClNeedDT=0;
  monthlyCoal.forEach(row=>{
    const prdty_eff=row.prdty*(row.pa/100)*(row.ua/100)*row.nl;
    const monthly=r0(prdty_eff*wh*days);
    totalCoalTon+=monthly; totalClNDT+=row.nt;
    const ctl=(55/row.prdty)*60;
    const ct_t=ctl+0.5+(row.dist/40)*60+2+(row.dist/60)*60;
    totalClNeedDT+=Math.ceil(0.95*ct_t/ctl);
  });
  const sr = totalCoalTon>0 ? r2(totalOBBCM/totalCoalTon) : 0;
  const setEl=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  setEl('ob-tot-ndt',totalNDT); setEl('ob-tot-needdt',totalNeedDT); setEl('ob-tot-monthly',fmtK(totalOBBCM));
  setEl('ob-tot-pa',count>0?r1(totalPa/count)+'%':'—'); setEl('ob-tot-ua',count>0?r1(totalUa/count)+'%':'—');
  setEl('coal-tot-ndt',totalClNDT); setEl('coal-tot-needdt',totalClNeedDT); setEl('coal-tot-monthly',fmtK(totalCoalTon));
  setEl('m-ob-total',fmtK(totalOBBCM)); setEl('m-coal-total',fmtK(totalCoalTon));
  setEl('m-sr',sr>0?sr:'-'); setEl('m-total-dt',totalNDT+totalClNDT);
  setEl('ob-total-summary',\`\${totalNDT} DT · \${fmtK(totalOBBCM)} BCM\`);
  setEl('coal-total-summary',\`\${totalClNDT} DT · \${fmtK(totalCoalTon)} ton\`);
  updateMonthlyChart(totalOBBCM, totalCoalTon);
}

function recalcAll(){calcWeather();renderOBTable();renderCoalTable();renderSupportTable();recalcMonthlyTotals();}

function updateMonthlyChart(ob, coal) {
  dChart('chMo');
  const ctx=document.getElementById('ch-monthly-compare');
  if(!ctx) return;
  charts['chMo']=new Chart(ctx,{type:'bar',data:{
    labels:['OB BCM (M)','Coal Ton (K)'],
    datasets:[
      {label:'Achieved',data:[ob/1e6,coal/1e3],backgroundColor:['rgba(245,158,11,.7)','rgba(59,130,246,.7)'],borderRadius:5},
      {label:'Target',data:[16.66,2343.8],backgroundColor:['rgba(245,158,11,.2)','rgba(59,130,246,.2)'],borderRadius:5},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{labels:{color:'#8b949e',font:{size:11}}}},
      scales:{x:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}}}}
  });
}

function saveMonthlyPreset(){
  const data={ob:monthlyOB,coal:monthlyCoal,support:monthlySupport,wx:wxData};
  localStorage.setItem('mineflow_monthly',JSON.stringify(data));
  alert('✓ Preset saved to local storage');
}

function printMonthly(){window.print();}

// ═══════════════════════════════════════════════════════════════════════
// OB SIMULATOR
// ═══════════════════════════════════════════════════════════════════════
function getOBP() {
  const grade=parseFloat(document.getElementById('ob-grade').value)||8;
  const rr=parseFloat(document.getElementById('ob-rr').value)||3;
  const grAd=Math.max(0.55,1-(grade+rr-5)*0.02);
  const rrAd=Math.max(0.80,1-rr*0.015);
  return {
    lk:document.getElementById('ob-loader').value,
    tk:'HD785',
    nl:+document.getElementById('ob-nloader').value||1,
    nt:+document.getElementById('ob-ntruck').value||7,
    dist:+document.getElementById('ob-dist').value||2.8,
    spdl:(+document.getElementById('ob-spdl').value||18)*grAd,
    spde:(+document.getElementById('ob-spde').value||25)*rrAd,
    spot:+document.getElementById('ob-spot').value||0.5,
    dump:+document.getElementById('ob-dump').value||2,
    mft:+document.getElementById('ob-mft').value||0.95,
    pa:+document.getElementById('ob-pa').value||94,
    ua:+document.getElementById('ob-ua').value||62.8,
    wh:+document.getElementById('ob-wh').value||14.18,
    days:+document.getElementById('ob-days').value||30,
    is_coal:false,
    tgt:+document.getElementById('ob-tgt').value||0,
  };
}

function runOBSim() {
  const p=getOBP(); const ct=calcCT(p); if(!ct) return;
  const st=mfStatus(ct.mf);
  const setEl=(id,v)=>{const e=document.getElementById(id);if(e){e.textContent=v;}};
  setEl('ob-r-ct',ct.total.toFixed(1));
  const mfEl=document.getElementById('ob-r-mf');
  if(mfEl){mfEl.textContent=ct.mf.toFixed(3);mfEl.style.color=mfColor(ct.mf);}
  setEl('ob-r-mf-st',st.lbl);
  setEl('ob-r-needdt',ct.needdt);
  setEl('ob-r-needdt-s',\`Opt: \${ct.opt} trucks\`);
  const L=LOADERS[p.lk];
  setEl('ob-r-lprd',r1(L.prdty_ob*p.pa/100*p.ua/100*p.nl));
  setEl('ob-r-fprd',ct.eff);
  setEl('ob-r-mo',fmtK(ct.monthly));
  renderMFBar('ob-mf-bar-wrap',ct.mf,ct.needdt,p.nt);
  renderCTDonut('ch-ob-ct','obCt',ct);
  renderMFSens('ch-ob-mf','obMf',sensitivityData(p),p.nt,ct.mf);
  renderPrdtyBar('ch-ob-prod','obProd',L.prdty_ob*p.pa/100*p.ua/100*p.nl,ct.fleet_t,ct.eff);
  renderCTTable('ob-ct-tbody',ct);
  renderOBRecs(p,ct,L);
}

function renderOBRecs(p,ct,L) {
  const list=document.getElementById('ob-rec-list');
  if(!list) return;
  const recs=[];
  const diff=p.nt-ct.needdt;
  if(ct.mf>1.10){recs.push({cls:'warn',title:\`🚨 Truck Overfleet MF=\${ct.mf.toFixed(3)}\`,body:\`\${p.nt} trucks vs optimal \${ct.needdt}. \${diff} excess units. Queue risk HIGH.\`,act:\`▶ Reduce to \${ct.needdt} trucks.\`});}
  else if(ct.mf<0.90){recs.push({cls:'crit',title:\`⚠️ Loader Idle MF=\${ct.mf.toFixed(3)}\`,body:\`Only \${p.nt} trucks. Loader idle \${r1((1-ct.mf)*100)}% of cycle. Add \${-diff} trucks.\`,act:\`▶ Deploy \${ct.needdt} trucks for MF=\${p.mft}.\`});}
  else{recs.push({cls:'ok',title:\`✓ Fleet Balanced MF=\${ct.mf.toFixed(3)}\`,body:\`\${p.nt} trucks · \${ct.eff} BCM/hr · \${fmtK(ct.monthly)} BCM/month.\`,act:\`▶ Maintain dispatch. Monitor ±5% CT variance.\`});}
  if(p.tgt>0&&ct.monthly<p.tgt){const g=p.tgt-ct.monthly;recs.push({cls:'crit',title:'❌ Below Target',body:\`Gap: \${fmtK(g)} BCM (\${r1(g/p.tgt*100)}% short). Need more trucks or loaders.\`,act:\`▶ Add \${Math.ceil(g/(ct.eff*p.wh*p.days/p.nt))} trucks or upgrade loader.\`});}
  if(ct.queue>2){recs.push({cls:'warn',title:'🚦 Queue Building',body:\`Queue \${ct.queue.toFixed(1)} min/cycle (\${r1(ct.queue/ct.total*100)}% CT). Indicates overfleet or loader gap.\`,act:\`▶ Stagger truck departures. Review dispatch intervals.\`});}
  list.innerHTML=recs.map(r=>\`<div class="alert \${r.cls}"><strong>\${r.title}</strong><span>\${r.body}</span><div class="act">\${r.act}</div></div>\`).join('');
}

function saveOBScenario(){
  const p=getOBP(),ct=calcCT(p);if(!ct)return;
  const L=LOADERS[p.lk];
  scenarios.push({label:\`OB:\${L.name}+\${p.nt}T@\${p.dist}km\`,type:'OB',loader:L.name,nt:p.nt,dist:p.dist,mf:ct.mf,needdt:ct.needdt,ct:ct.total,prd:ct.eff,monthly:ct.monthly,cpu:ct.cpunit,tgt:p.tgt});
  updateScenarios();alert('✓ Saved!');
}

// ═══════════════════════════════════════════════════════════════════════
// COAL SIMULATOR
// ═══════════════════════════════════════════════════════════════════════
function getCLP() {
  return {
    lk:document.getElementById('cl-loader').value,
    tk:document.getElementById('cl-truck').value,
    nl:+document.getElementById('cl-nloader').value||1,
    nt:+document.getElementById('cl-ntruck').value||7,
    dist:+document.getElementById('cl-dist').value||18.2,
    spdl:+document.getElementById('cl-spdl').value||40,
    spde:+document.getElementById('cl-spde').value||60,
    spot:+document.getElementById('cl-spot').value||0.5,
    dump:+document.getElementById('cl-dump').value||2,
    mft:+document.getElementById('cl-mft').value||0.95,
    pa:+document.getElementById('cl-pa').value||93,
    ua:+document.getElementById('cl-ua').value||62,
    wh:+document.getElementById('cl-wh').value||14,
    days:+document.getElementById('cl-days').value||30,
    is_coal:true,
    tgt:+document.getElementById('cl-tgt').value||0,
  };
}

function runCoalSim() {
  const p=getCLP(),ct=calcCT(p);if(!ct)return;
  const st=mfStatus(ct.mf);
  const setEl=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  setEl('cl-r-ct',ct.total.toFixed(1));
  const mfEl=document.getElementById('cl-r-mf');
  if(mfEl){mfEl.textContent=ct.mf.toFixed(3);mfEl.style.color=mfColor(ct.mf);}
  setEl('cl-r-mf-st',st.lbl);
  setEl('cl-r-needdt',ct.needdt);
  setEl('cl-r-needdt-s',\`Opt: \${ct.opt}\`);
  const L=LOADERS[p.lk];
  setEl('cl-r-lprd',r1((L.prdty_coal||L.prdty_ob)*p.pa/100*p.ua/100*p.nl));
  setEl('cl-r-fprd',ct.eff);
  setEl('cl-r-mo',fmtK(ct.monthly));
  renderMFBar('cl-mf-bar-wrap',ct.mf,ct.needdt,p.nt);
  renderCTDonut('ch-cl-ct','clCt',ct);
  renderMFSens('ch-cl-mf','clMf',sensitivityData(p),p.nt,ct.mf);
  renderCoalGap('ch-cl-gap',ct.monthly,p.tgt);
  renderCoalRecs(p,ct,L);
}

function renderCoalRecs(p,ct,L){
  const list=document.getElementById('coal-rec-list');if(!list)return;
  const recs=[];
  if(ct.mf>1.10){recs.push({cls:'warn',title:\`🚨 Overfleet MF=\${ct.mf.toFixed(3)}\`,body:\`\${p.nt-ct.needdt} excess trucks. Crusher congestion risk.\`,act:\`▶ Reduce to \${ct.needdt} trucks.\`});}
  else if(ct.mf<0.85){recs.push({cls:'crit',title:\`⚠️ Underfleet MF=\${ct.mf.toFixed(3)}\`,body:\`Need \${ct.needdt} trucks. Missing \${ct.needdt-p.nt} units.\`,act:\`▶ Deploy additional \${ct.needdt-p.nt} trucks immediately.\`});}
  else{recs.push({cls:'ok',title:\`✓ Coal Fleet Balanced MF=\${ct.mf.toFixed(3)}\`,body:\`Output: \${ct.eff} ton/hr · \${fmtK(ct.monthly)} ton/month.\`,act:\`▶ Maintain dispatch. Monitor crusher rate.\`});}
  if(p.tgt>0){const g=p.tgt-ct.monthly;if(g>0)recs.push({cls:'crit',title:'❌ Below Coal Target',body:\`Gap: \${fmtK(Math.round(g))} ton (\${r1(g/p.tgt*100)}% short).\`,act:\`▶ Add \${Math.ceil(g/(ct.eff*p.wh*p.days/p.nt))} trucks.\`});else recs.push({cls:'ok',title:'✓ Coal Target Achievable',body:\`Surplus: \${fmtK(-g)} ton above target.\`,act:'▶ Maintain configuration.'});}
  list.innerHTML=recs.map(r=>\`<div class="alert \${r.cls}"><strong>\${r.title}</strong><span>\${r.body}</span><div class="act">\${r.act}</div></div>\`).join('');
}

function saveCoalScenario(){
  const p=getCLP(),ct=calcCT(p);if(!ct)return;
  const L=LOADERS[p.lk];
  scenarios.push({label:\`Coal:\${L.name}+\${p.nt}T@\${p.dist}km\`,type:'COAL',loader:L.name,nt:p.nt,dist:p.dist,mf:ct.mf,needdt:ct.needdt,ct:ct.total,prd:ct.eff,monthly:ct.monthly,cpu:ct.cpunit,tgt:p.tgt});
  updateScenarios();alert('✓ Saved!');
}

// ═══════════════════════════════════════════════════════════════════════
// PHR ANALYSIS
// ═══════════════════════════════════════════════════════════════════════
function calcPHR(){
  const ob=+document.getElementById('phr-ob').value||16659742;
  const coal=+document.getElementById('phr-coal').value||2343836;
  const ob_nl=+document.getElementById('phr-ob-nl').value||37;
  const ob_p=+document.getElementById('phr-ob-p').value||850;
  const ob_d=+document.getElementById('phr-ob-d').value||3.3;
  const cl_nl=+document.getElementById('phr-cl-nl').value||14;
  const cl_p=+document.getElementById('phr-cl-p').value||415;
  const cl_d=+document.getElementById('phr-cl-d').value||16.1;
  const days=+document.getElementById('phr-days').value||30;
  const wh=+document.getElementById('phr-wh').value||14.18;
  const sr_tgt=+document.getElementById('phr-sr-tgt').value||7.11;
  const sr=r2(ob/coal);
  const ob_cap=r0(ob_p*ob_nl*0.94*0.6284*wh*days);
  const cl_cap=r0(cl_p*cl_nl*0.915*0.6046*wh*days);
  const setEl=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  setEl('phr-sr-val',sr); setEl('phr-ob-cap',fmtK(ob_cap)); setEl('phr-cl-cap',fmtK(cl_cap));
  setEl('phr-ob-disp',(ob/1e6).toFixed(2)+'M'); setEl('phr-cl-disp',(coal/1e6).toFixed(2)+'M');
  setEl('phr-sr-big',sr);
  const diff=sr-sr_tgt, absDiff=Math.abs(diff);
  let stMsg,stVal;
  if(absDiff<0.3){stMsg='✓ ON TARGET'; stVal='SR matches plan';}
  else if(diff>0){stMsg='▲ ABOVE'; stVal=\`+\${r2(diff)} vs target \${sr_tgt}\`;}
  else{stMsg='▼ BELOW'; stVal=\`\${r2(diff)} vs target \${sr_tgt}\`;}
  setEl('phr-sr-st',stMsg); setEl('phr-sr-msg',stVal);
  const barPct=Math.min(100,Math.max(0,(1-absDiff/sr_tgt)*100));
  const barEl=document.getElementById('phr-sr-bar');
  if(barEl){barEl.style.width=barPct+'%';barEl.style.background=absDiff<0.3?'#22c55e':absDiff<1?'#f59e0b':'#ef4444';}
  renderPHRCap(ob,coal,ob_cap,cl_cap,sr_tgt);
  renderPHRAreaTable(days,wh,sr_tgt);
  renderSRSens(coal,days,wh,ob_nl,ob_p,sr_tgt);
}

function renderPHRCap(ob,coal,ob_cap,cl_cap,sr_tgt){
  dChart('phrCap');
  const ctx=document.getElementById('ch-phr-cap');if(!ctx)return;
  charts['phrCap']=new Chart(ctx,{type:'bar',data:{labels:['OB (BCM/month)','Coal (ton/month)'],
    datasets:[
      {label:'Loader Capacity',data:[ob_cap,cl_cap],backgroundColor:'rgba(245,158,11,.7)',borderRadius:4},
      {label:'Target',data:[ob,coal],backgroundColor:'rgba(59,130,246,.5)',borderRadius:4}
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{labels:{color:'#8b949e',font:{size:11}}}},
      scales:{x:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},
        title:{display:true,text:'BCM / ton per month',color:'#8b949e'}}}}
  });
}

function renderPHRAreaTable(days,wh,sr_tgt){
  const areas=[
    {a:'PA1',ob:13220645,coal:686308,od:2.83,cd:18.2},
    {a:'PA2',ob:6169037,coal:0,od:3.51,cd:0},
    {a:'PA3',ob:2258724,coal:0,od:3.75,cd:0},
    {a:'PA4',ob:3439097,coal:320528,od:4.6,cd:22},
    {a:'PSV/TS',ob:699449,coal:0,od:5.0,cd:0},
    {a:'TOTAL',ob:16659742,coal:2343836,od:3.31,cd:16.1},
  ];
  const tbody=document.getElementById('phr-area-tbody');if(!tbody)return;
  tbody.innerHTML=areas.map(a=>{
    const sr=a.coal>0?r2(a.ob/a.coal):'—';
    const ob_ctl=4.0,ob_ct=ob_ctl+0.5+(a.od/18)*60+2+(a.od/25)*60;
    const ob_dt=a.od>0?Math.ceil(0.95*ob_ct/ob_ctl):'—';
    const cl_ctl=7.95,cl_ct=cl_ctl+0.5+(a.cd/40)*60+2+(a.cd/60)*60;
    const cl_dt=a.cd>0?Math.ceil(0.95*cl_ct/cl_ctl):'—';
    const srN=typeof sr==='number'?sr:null;
    const cls=srN?Math.abs(srN-sr_tgt)<0.5?'ok':'warn':'info';
    return \`<tr><td><strong>\${a.a}</strong></td><td>\${fmt(a.ob)}</td><td>\${a.coal?fmt(a.coal):'—'}</td>
      <td><strong>\${sr}</strong></td><td>\${a.od||'—'}</td><td>\${ob_dt}</td><td>\${a.cd||'—'}</td><td>\${cl_dt}</td>
      <td><span class="status \${cls}">\${srN?Math.abs(srN-sr_tgt)<0.5?'✓ OK':'CHECK':'N/A'}</span></td></tr>\`;
  }).join('');
}

function renderSRSens(coal,days,wh,nl,prdty,sr_tgt){
  dChart('phrSens');
  const ctx=document.getElementById('ch-phr-sens');if(!ctx)return;
  const srs=[4,5,6,6.5,7,7.5,8,9,10,12];
  const ob_needed=srs.map(s=>s*coal/1e6);
  const trucks=srs.map(s=>{
    const ob=s*coal;
    const lp=prdty*nl*0.94*0.6284*wh*days;
    return Math.ceil(ob/lp*363);
  });
  charts['phrSens']=new Chart(ctx,{type:'line',data:{labels:srs.map(s=>'SR='+s),
    datasets:[
      {label:'OB BCM needed (M)',data:ob_needed,borderColor:'#f59e0b',backgroundColor:'rgba(245,158,11,.1)',fill:true,tension:.3,yAxisID:'y'},
      {label:'Approx DT Trucks',data:trucks,borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,.1)',fill:true,tension:.3,yAxisID:'y1'},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      scales:{x:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}},
        y:{ticks:{color:'#f59e0b'},grid:{color:'#30363d'},title:{display:true,text:'BCM (M)',color:'#f59e0b'}},
        y1:{position:'right',ticks:{color:'#3b82f6'},grid:{drawOnChartArea:false},title:{display:true,text:'Trucks',color:'#3b82f6'}}},
      plugins:{legend:{labels:{color:'#8b949e',font:{size:11}}}}}
  });
}

// ═══════════════════════════════════════════════════════════════════════
// DT TRAFFIC SIMULATOR
// ═══════════════════════════════════════════════════════════════════════
const G = 9.81;
let dtChartFleet=null, dtChartSens=null;

function dtGetParams(){
  return {
    lShared:+document.getElementById('dt-lshared').value||2.5,
    lTruck:+document.getElementById('dt-ltruck').value||8.5,
    mu:+document.getElementById('dt-mu').value||0.40,
    sf:+document.getElementById('dt-sf').value||1.30,
    tReact:+document.getElementById('dt-treact').value||3.0,
    buffer:+document.getElementById('dt-buffer').value||10,
  };
}

function dtFleetDensity(fleet,lShared){return fleet.dist>0?(lShared/fleet.dist)*fleet.ndt:0;}
function dtTotalDensity(lShared){return dtFleets.reduce((s,f)=>s+dtFleetDensity(f,lShared),0);}
function dtCalcGap(dpd,lShared,lTruck){if(dpd<=0)return 9999;return(lShared*1000/dpd)-lTruck;}
function dtCalcSpeed(gap,tReact,sf,mu,buffer){
  const eff=gap-buffer;if(eff<=0)return 0;
  const A=sf/(2*G*mu),B=tReact,C=eff;
  const disc=B*B+4*A*C;if(disc<0)return 0;
  return Math.max(0,((-B+Math.sqrt(disc))/(2*A))*3.6);
}
function dtCalcAll(){
  const p=dtGetParams();
  const td=dtTotalDensity(p.lShared);
  const dpd=td/2;
  const gap=dtCalcGap(dpd,p.lShared,p.lTruck);
  const spd=dtCalcSpeed(gap,p.tReact,p.sf,p.mu,p.buffer);
  return{td,dpd,gap,spd,p};
}
function dtGapStatus(gap){
  if(gap>=60)return{cls:'safe-bg',txt:'SAFE',clr:'#22c55e'};
  if(gap>=40)return{cls:'warn-bg',txt:'CAUTION',clr:'#f59e0b'};
  return{cls:'danger-bg',txt:'CRITICAL',clr:'#ef4444'};
}
function dtSpdStatus(spd){
  if(spd>=30)return{cls:'safe-bg',txt:'SAFE'};
  if(spd>=15)return{cls:'warn-bg',txt:'CAUTION'};
  return{cls:'danger-bg',txt:'CRITICAL'};
}
function dtDensStatus(td){
  if(td<5)return{cls:'safe-bg',txt:'NORMAL'};
  if(td<10)return{cls:'warn-bg',txt:'DENSE'};
  return{cls:'danger-bg',txt:'CRITICAL'};
}

function dtUpdateResults(){
  const{td,dpd,gap,spd,p}=dtCalcAll();
  const setEl=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  setEl('dt-r-density',td.toFixed(2));
  const dst=dtDensStatus(td);
  const dstEl=document.getElementById('dt-r-dens-st');if(dstEl){dstEl.className='dm-status '+dst.cls;dstEl.textContent=dst.txt;}
  setEl('dt-r-dpd',dpd.toFixed(2));
  setEl('dt-r-gap',Math.max(0,gap).toFixed(1));
  const gst=dtGapStatus(Math.max(0,gap));
  const gstEl=document.getElementById('dt-r-gap-st');if(gstEl){gstEl.className='dm-status '+gst.cls;gstEl.textContent=gst.txt;}
  setEl('dt-r-speed',Math.max(0,spd).toFixed(1));
  const sst=dtSpdStatus(Math.max(0,spd));
  const spdBar=document.getElementById('dt-r-spd-bar');
  if(spdBar){spdBar.style.width=Math.min(100,Math.max(0,spd)/60*100)+'%';spdBar.style.background=gst.clr;}
  setEl('dt-vis-gap',\`Gap: \${Math.max(0,gap).toFixed(0)} m\`);
  dtUpdateRoadVis(dpd,p.lShared,p.lTruck);
  // Summary chips
  const sumEl=document.getElementById('dt-param-summary');
  if(sumEl)sumEl.innerHTML=\`<div class="dt-chip">lShared: <b>\${p.lShared}</b> km</div><div class="dt-chip">Trucks total: <b>\${dtFleets.reduce((a,f)=>a+f.ndt,0)}</b></div><div class="dt-chip">Density/dir: <b>\${dpd.toFixed(2)}</b></div><div class="dt-chip">Gap: <b>\${Math.max(0,gap).toFixed(1)} m</b></div><div class="dt-chip">Vmax: <b>\${Math.max(0,spd).toFixed(1)} km/h</b></div>\`;
  // Badges
  const fb=document.getElementById('dt-fleet-badge');if(fb)fb.textContent=dtFleets.length+' fleet';
  const tb=document.getElementById('dt-total-badge');if(tb)tb.textContent=dtFleets.reduce((a,f)=>a+f.ndt,0)+' DT';
}

function dtUpdateRoadVis(dpd,lShared,lTruck){
  const canvas=document.getElementById('dt-road-canvas');if(!canvas)return;
  const W=canvas.offsetWidth||400;
  canvas.querySelectorAll('.dt-truck').forEach(e=>e.remove());
  if(dpd<=0||lShared<=0)return;
  const spacePer=(lShared*1000/dpd);
  const scale=W/(lShared*1000);
  const truckW=Math.max(6,Math.min(30,lTruck*scale));
  const count=Math.min(Math.floor(W/Math.max(truckW+2,spacePer*scale)),20);
  const colors=['#3b82f6','#22c55e','#f59e0b','#a855f7','#f97316'];
  for(let i=0;i<count;i++){
    const fleet=dtFleets[i%dtFleets.length];
    const col=colors[i%colors.length];
    const x=(i*spacePer*scale)%(W-truckW);
    const loaded=document.createElement('div');
    loaded.className='dt-truck';
    loaded.style.cssText=\`position:absolute;top:3px;height:14px;width:\${truckW}px;left:\${x}px;background:\${col};border-radius:2px;opacity:.85;font-size:7px;display:flex;align-items:center;justify-content:center;color:#000;overflow:hidden\`;
    loaded.textContent=fleet.name.slice(0,3);
    canvas.appendChild(loaded);
    const empty=document.createElement('div');
    empty.className='dt-truck';
    empty.style.cssText=\`position:absolute;top:25px;height:14px;width:\${truckW}px;left:\${(x+spacePer*scale/3)%(W-truckW)}px;background:var(--surface2);border:1px solid var(--border2);border-radius:2px;opacity:.7\`;
    canvas.appendChild(empty);
  }
}

function dtRenderFleetTable(){
  const p=dtGetParams();
  const tbody=document.getElementById('dt-fleet-tbody');if(!tbody)return;
  const maxC=Math.max(...dtFleets.map(f=>dtFleetDensity(f,p.lShared)),0.01);
  tbody.innerHTML=dtFleets.map(f=>{
    const contrib=dtFleetDensity(f,p.lShared);
    const pct=p.lShared&&f.dist?((p.lShared/f.dist)*100).toFixed(1):'—';
    const barW=Math.min(100,(contrib/(maxC*1.1))*100);
    return \`<tr>
      <td><input type="text" value="\${f.name}" oninput="dtFleets.find(x=>x.id==\${f.id}).name=this.value;dtUpdateFleetChart()" style="min-width:80px"></td>
      <td><input type="number" value="\${f.ndt}" min="0" step="1" oninput="dtFleets.find(x=>x.id==\${f.id}).ndt=+this.value;dtFullUpdate()" style="width:60px;text-align:center"></td>
      <td><input type="number" value="\${f.dist}" min="0.1" step="0.1" oninput="dtFleets.find(x=>x.id==\${f.id}).dist=+this.value;dtFullUpdate()" style="width:70px;text-align:center"></td>
      <td><div class="contrib-bar"><div class="contrib-fill" style="width:\${barW}%"></div></div><div class="contrib-val">\${contrib.toFixed(2)} trucks</div></td>
      <td style="font-size:10.5px;color:var(--text2)">\${pct}%</td>
      <td><button class="btn-rm" onclick="dtFleets=dtFleets.filter(x=>x.id!=\${f.id});dtFullUpdate()">✕</button></td>
    </tr>\`;
  }).join('');
}

function dtAddFleet(){
  dtFleets.push({id:dtNextId++,name:\`Fleet-\${dtNextId}\`,ndt:5,dist:4.0});
  dtFullUpdate();
}

function dtUpdateFleetChart(){
  dChart('dtFleet');
  const p=dtGetParams();
  const ctx=document.getElementById('ch-dt-fleet');if(!ctx)return;
  const colors=['#f59e0b','#3b82f6','#22c55e','#a855f7','#f97316','#06b6d4','#ec4899'];
  charts['dtFleet']=new Chart(ctx,{type:'bar',
    data:{labels:dtFleets.map(f=>f.name),datasets:[{data:dtFleets.map(f=>r2(dtFleetDensity(f,p.lShared))),backgroundColor:dtFleets.map((_,i)=>colors[i%colors.length]),borderRadius:5}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
      scales:{x:{ticks:{color:'#8b949e',font:{size:10}},grid:{color:'#30363d'}},
        y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'Density contribution',color:'#8b949e'}}}}
  });
}

function dtUpdateSensSelect(){
  const sel=document.getElementById('dt-sens-select');if(!sel)return;
  const cur=sel.value;
  sel.innerHTML=dtFleets.map(f=>\`<option value="\${f.id}" \${f.id==cur?'selected':''}>\${f.name}</option>\`).join('');
}

function dtUpdateSens(){
  dChart('dtSens');
  const ctx=document.getElementById('ch-dt-sens');if(!ctx)return;
  const p=dtGetParams();
  const fId=parseInt(document.getElementById('dt-sens-select')?.value)||dtFleets[0]?.id;
  const res=[];
  for(let add=0;add<=20;add++){
    const td=dtFleets.reduce((s,f)=>s+dtFleetDensity({...f,ndt:f.id===fId?f.ndt+add:f.ndt},p.lShared),0);
    const dpd=td/2,gap=dtCalcGap(dpd,p.lShared,p.lTruck),spd=dtCalcSpeed(gap,p.tReact,p.sf,p.mu,p.buffer);
    res.push({add,spd:Math.max(0,spd),gap:Math.max(0,gap)});
  }
  charts['dtSens']=new Chart(ctx,{type:'line',data:{labels:res.map(r=>'+'+r.add),
    datasets:[
      {label:'Max Speed (km/h)',data:res.map(r=>r1(r.spd)),borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,.08)',fill:true,tension:.3,yAxisID:'yS'},
      {label:'Gap (m)',data:res.map(r=>r1(r.gap)),borderColor:'#22c55e',borderDash:[4,3],tension:.3,pointRadius:2,yAxisID:'yG'},
      {label:'Safe gap 40m',data:res.map(()=>40),borderColor:'rgba(239,68,68,.5)',borderDash:[5,4],pointRadius:0,yAxisID:'yG'},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      scales:{x:{ticks:{color:'#8b949e',font:{size:10}},grid:{color:'#30363d'},title:{display:true,text:'Added DT to selected fleet',color:'#6e7681',font:{size:10}}},
        yS:{ticks:{color:'#3b82f6',font:{size:10}},grid:{color:'#30363d'},title:{display:true,text:'km/h',color:'#3b82f6',font:{size:10}}},
        yG:{position:'right',ticks:{color:'#22c55e',font:{size:10}},grid:{drawOnChartArea:false},title:{display:true,text:'meters',color:'#22c55e',font:{size:10}}}},
      plugins:{legend:{display:false}}}
  });
}

function dtUpdateWC(){
  const pct=parseInt(document.getElementById('dt-abnpct').value)||0;
  document.getElementById('dt-abnpct-lbl').textContent=pct+'%';
  const{td,dpd,gap:nGap,spd:nSpd,p}=dtCalcAll();
  const bm=1+(pct/100)*1.2;
  const wDpd=dpd*bm;
  const wGap=Math.max(0,dtCalcGap(wDpd,p.lShared,p.lTruck));
  const wSpd=Math.max(0,dtCalcSpeed(wGap,p.tReact,p.sf,p.mu,p.buffer));
  const gst=dtGapStatus(wGap),sst=dtSpdStatus(wSpd);
  const setEl=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  setEl('dt-wc-dpd',wDpd.toFixed(2));
  setEl('dt-wc-dpd-d',\`▲ +\${(wDpd-dpd).toFixed(2)} vs normal\`);
  setEl('dt-wc-gap',wGap.toFixed(1));
  const gstEl=document.getElementById('dt-wc-gap-st');if(gstEl){gstEl.className='dm-status '+gst.cls;gstEl.textContent=gst.txt;}
  setEl('dt-wc-gap-d',\`▼ -\${(Math.max(0,dtCalcGap(dpd,p.lShared,p.lTruck))-wGap).toFixed(1)} m vs normal\`);
  setEl('dt-wc-spd',wSpd.toFixed(1));
  const sstEl=document.getElementById('dt-wc-spd-st');if(sstEl){sstEl.className='dm-status '+sst.cls;sstEl.textContent=sst.txt;}
  setEl('dt-wc-spd-d',\`▼ -\${(Math.max(0,dtCalcSpeed(dtCalcGap(dpd,p.lShared,p.lTruck),p.tReact,p.sf,p.mu,p.buffer))-wSpd).toFixed(1)} km/h vs normal\`);
  let rec;
  if(pct===0)rec='Normal operation. No abnormal cycles.';
  else if(wGap<20)rec=\`⚠ CRITICAL: With \${pct}% abnormal cycles, gap drops to \${wGap.toFixed(0)} m — below safe minimum. HIGH collision risk! Reduce fleet or restrict speed to \${wSpd.toFixed(0)} km/h MAX.\`;
  else if(wGap<40)rec=\`⚡ CAUTION: With \${pct}% abnormal cycles, gap = \${wGap.toFixed(0)} m (below 40 m safe limit). Limit speed to \${wSpd.toFixed(0)} km/h and monitor closely.\`;
  else rec=\`✓ With \${pct}% abnormal cycles, gap = \${wGap.toFixed(0)} m — still above 40 m. Speed \${wSpd.toFixed(0)} km/h maintainable. Monitor and prevent further increase.\`;
  setEl('dt-wc-rec',rec);
}

function dtFullUpdate(){
  dtRenderFleetTable();
  dtUpdateResults();
  dtUpdateFleetChart();
  dtUpdateSensSelect();
  dtUpdateSens();
  dtUpdateWC();
}

// ═══════════════════════════════════════════════════════════════════════
// CHART HELPERS
// ═══════════════════════════════════════════════════════════════════════
function dChart(key){if(charts[key]){charts[key].destroy();charts[key]=null;}}

function renderCTDonut(id,key,ct){
  dChart(key);
  const ctx=document.getElementById(id);if(!ctx)return;
  const data=[ct.ctl,ct.tl,ct.dump,ct.spot,ct.te,ct.queue];
  const labels=['Loading','Travel Loaded','Dumping','Spotting','Travel Empty','Queue'];
  const colors=['#f59e0b','#3b82f6','#22c55e','#a855f7','#6366f1','#ef4444'];
  charts[key]=new Chart(ctx,{type:'doughnut',data:{labels,datasets:[{data,backgroundColor:colors,borderWidth:1,borderColor:'#30363d'}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'60%',
      plugins:{legend:{position:'right',labels:{color:'#8b949e',font:{size:10},boxWidth:10}},
        tooltip:{callbacks:{label:c=>\`\${c.label}: \${c.raw.toFixed(2)} min (\${r1(c.raw/data.reduce((a,b)=>a+b,0)*100)}%)\`}}}}
  });
}

function renderMFSens(id,key,data,nt,curMF){
  dChart(key);
  const ctx=document.getElementById(id);if(!ctx)return;
  charts[key]=new Chart(ctx,{type:'line',
    data:{labels:data.map(r=>r.n),datasets:[
      {label:'MF',data:data.map(r=>r.mf),borderColor:'#f59e0b',backgroundColor:'rgba(245,158,11,.05)',tension:.3,fill:true,yAxisID:'y',pointRadius:data.map(r=>r.n===nt?6:2),pointBackgroundColor:data.map(r=>r.n===nt?'#f59e0b':'transparent')},
      {label:'Prdty/hr',data:data.map(r=>r.prd),borderColor:'#22c55e',tension:.3,yAxisID:'y1',pointRadius:1},
      {label:'Target MF 0.95',data:data.map(()=>0.95),borderColor:'rgba(34,197,94,.4)',borderDash:[4,3],pointRadius:0,yAxisID:'y'},
      {label:'MF 1.05',data:data.map(()=>1.05),borderColor:'rgba(249,115,22,.4)',borderDash:[4,3],pointRadius:0,yAxisID:'y'},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      scales:{x:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'N Trucks',color:'#6e7681',font:{size:10}}},
        y:{ticks:{color:'#f59e0b'},grid:{color:'#30363d'},title:{display:true,text:'MF',color:'#f59e0b',font:{size:10}}},
        y1:{position:'right',ticks:{color:'#22c55e'},grid:{drawOnChartArea:false},title:{display:true,text:'Prod/hr',color:'#22c55e',font:{size:10}}}},
      plugins:{legend:{labels:{color:'#8b949e',font:{size:10}}}}}
  });
}

function renderPrdtyBar(id,key,lp,tp,ep){
  dChart(key);
  const ctx=document.getElementById(id);if(!ctx)return;
  charts[key]=new Chart(ctx,{type:'bar',data:{labels:['Loader Capacity','Fleet Throughput','Effective'],datasets:[{data:[lp,tp,ep],backgroundColor:['#f59e0b','#3b82f6','#22c55e'],borderRadius:5}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
      scales:{x:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'BCM/hr',color:'#8b949e'}}}}
  });
}

function renderCoalGap(id,monthly,target){
  dChart('clGap');
  const ctx=document.getElementById(id);if(!ctx)return;
  const gap=target>0?Math.max(0,target-monthly):0;
  charts['clGap']=new Chart(ctx,{type:'bar',data:{labels:['Achieved (ton)','Gap to Target'],datasets:[{data:[monthly/1000,gap/1000],backgroundColor:[monthly>=target||target===0?'#22c55e':'#f59e0b','#ef4444'],borderRadius:5}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
      scales:{x:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'Thousand Tons',color:'#8b949e'}}}}
  });
}

function renderCTTable(id,ct){
  const tbody=document.getElementById(id);if(!tbody)return;
  const parts=[['Loading (CT Loader)',ct.ctl,'Fill time per truck from loader'],['Travel Loaded',ct.tl,'One-way haul to dump'],['Dumping',ct.dump,'Disposal time'],['Spotting',ct.spot,'Position at loader'],['Travel Empty',ct.te,'Return trip'],['Queue',ct.queue,'Wait time (MF>1)']];
  tbody.innerHTML=parts.map(([c,v,n])=>\`<tr><td>\${c}</td><td><strong>\${v.toFixed(2)}</strong></td><td>\${r1(v/ct.total*100)}%</td><td style="color:var(--text2);font-size:11px">\${n}</td></tr>\`).join('')+
    \`<tr style="background:var(--surface2)"><td><strong>TOTAL</strong></td><td><strong>\${ct.total.toFixed(2)}</strong></td><td>100%</td><td></td></tr>\`;
}

function renderMFBar(containerId,mf,needdt,nt){
  const c=document.getElementById(containerId);if(!c)return;
  const pct=Math.min(150,mf*100);
  const col=mfColor(mf);
  const st=mfStatus(mf);
  c.innerHTML=\`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
    <span style="font-size:11px;color:var(--text2)">Matching Factor (0 → 1.5)</span>
    <span class="status \${st.cls}">\${st.icon} \${st.lbl}</span>
  </div>
  <div style="height:10px;background:var(--surface2);border-radius:5px;overflow:hidden;position:relative">
    <div style="position:absolute;left:60%;width:10%;height:100%;background:rgba(34,197,94,.15);border-left:1px dashed rgba(34,197,94,.5);border-right:1px dashed rgba(249,115,22,.5)"></div>
    <div style="height:100%;width:\${pct}%;background:\${col};border-radius:5px;transition:.3s"></div>
  </div>
  <div style="display:flex;justify-content:space-between;font-size:11px;margin-top:6px">
    <span>Deployed: <strong>\${nt}</strong> trucks</span>
    <span>Optimal: <strong>\${needdt}</strong> trucks</span>
    <span>MF: <strong style="color:\${col}">\${mf.toFixed(3)}</strong></span>
  </div>\`;
}

// ═══════════════════════════════════════════════════════════════════════
// SCENARIO COMPARE
// ═══════════════════════════════════════════════════════════════════════
function clearScenarios(){scenarios=[];updateScenarios();}
function updateScenarios(){
  const has=scenarios.length>0;
  const empty=document.getElementById('sc-empty'),content=document.getElementById('sc-content');
  if(empty)empty.style.display=has?'none':'block';
  if(content)content.style.display=has?'block':'none';
  if(!has)return;
  const metrics=[['Type',s=>s.type,null],['Loader',s=>s.loader,null],['N Trucks',s=>s.nt,'lower'],['Distance (km)',s=>s.dist.toFixed(1),null],['CT (min)',s=>s.ct.toFixed(1),'lower'],['MF',s=>s.mf.toFixed(3),'target1'],['Need DT',s=>s.needdt,'lower'],['Prod/hr',s=>s.prd,'higher'],['Monthly',s=>fmtK(s.monthly),'higher'],['USD/unit',s=>s.cpu,'lower'],['vs Target',s=>s.tgt>0?s.monthly>=s.tgt?'✓ OK':'❌ SHORT':'—',null]];
  let html='<thead><tr><th>Metric</th>'+scenarios.map((_,i)=>\`<th>S\${i+1}: \${scenarios[i].label.split(':')[1]||scenarios[i].label}</th>\`).join('')+'</tr></thead><tbody>';
  metrics.forEach(([lbl,fn,cmp])=>{
    html+=\`<tr><td>\${lbl}</td>\`;
    const vals=scenarios.map(s=>fn(s));
    const nums=vals.map(v=>parseFloat(String(v).replace(/[^0-9.-]/g,'')));
    vals.forEach((v,i)=>{
      let cls='';
      if(cmp==='higher'&&!isNaN(nums[i])&&nums.filter(x=>!isNaN(x)).length>1)cls=nums[i]===Math.max(...nums.filter(x=>!isNaN(x)))?'better':nums[i]===Math.min(...nums.filter(x=>!isNaN(x)))?'worse':'';
      else if(cmp==='lower'&&!isNaN(nums[i])&&nums.filter(x=>!isNaN(x)).length>1)cls=nums[i]===Math.min(...nums.filter(x=>!isNaN(x)))?'better':nums[i]===Math.max(...nums.filter(x=>!isNaN(x)))?'worse':'';
      else if(cmp==='target1'&&!isNaN(nums[i]))cls=Math.abs(nums[i]-1)===Math.min(...nums.map(v=>Math.abs(v-1)).filter(x=>!isNaN(x)))?'better':'';
      html+=\`<td class="\${cls}">\${v}</td>\`;
    });
    html+='</tr>';
  });
  html+='</tbody>';
  const tbl=document.getElementById('sc-tbl');if(tbl)tbl.innerHTML=html;
  dChart('sc');
  const ctx=document.getElementById('ch-sc');if(!ctx)return;
  charts['sc']=new Chart(ctx,{type:'bar',data:{labels:scenarios.map((_,i)=>'S'+(i+1)),
    datasets:[{label:'Prod/hr',data:scenarios.map(s=>s.prd),backgroundColor:'#f59e0b',borderRadius:4,yAxisID:'y'},{label:'MF×100',data:scenarios.map(s=>r1(s.mf*100)),backgroundColor:'#3b82f6',borderRadius:4,yAxisID:'y'}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#8b949e',font:{size:11}}}},scales:{x:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}},}}
  });
}

// ═══════════════════════════════════════════════════════════════════════
// COST ANALYSIS
// ═══════════════════════════════════════════════════════════════════════
function initCostAnalysis(){
  // Stacked bar
  dChart('costBreak');
  const ctx=document.getElementById('ch-cost-break');if(!ctx)return;
  const names=COST_DATA.map(d=>d.egi.split('(')[0].trim());
  charts['costBreak']=new Chart(ctx,{type:'bar',data:{labels:names,
    datasets:[
      {label:'Fuel',data:COST_DATA.map(d=>d.fuel),backgroundColor:'#f59e0b'},
      {label:'Spareparts',data:COST_DATA.map(d=>d.sp),backgroundColor:'#3b82f6'},
      {label:'W/Shop',data:COST_DATA.map(d=>d.ws),backgroundColor:'#22c55e'},
      {label:'Oil',data:COST_DATA.map(d=>d.oil),backgroundColor:'#a855f7'},
    ]},
    options:{responsive:true,maintainAspectRatio:false,scales:{x:{stacked:true,ticks:{color:'#8b949e',font:{size:9}},grid:{color:'#30363d'}},y:{stacked:true,ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'USD/hr',color:'#8b949e'}}},plugins:{legend:{labels:{color:'#8b949e',font:{size:10}}}}}
  });
  // Detail table
  const tbody=document.getElementById('cost-detail-tbody');if(!tbody)return;
  tbody.innerHTML=COST_DATA.map(d=>\`<tr>
    <td><strong>\${d.egi}</strong></td>
    <td><span class="status \${d.cat==='Hauler'?'info':d.cat==='Dozer'||d.cat==='Grader'?'neu':'ok'}">\${d.cat}</span></td>
    <td>\${fmt(Math.round(d.whrs))}</td>
    <td>\${d.depre.toFixed(2)}</td>
    <td><strong>\${d.fuel.toFixed(2)}</strong></td>
    <td>\${d.ws.toFixed(2)}</td>
    <td>\${d.sp.toFixed(2)}</td>
    <td>\${d.oil.toFixed(2)}</td>
    <td><strong style="color:var(--accent)">\${d.total.toFixed(2)}</strong></td>
  </tr>\`).join('');
  // Monthly cost chart
  dChart('costMon');
  const ctx2=document.getElementById('ch-cost-monthly');if(!ctx2)return;
  const wh=14.18*30;
  const fleetItems=[
    {n:'363x HD785-7',c:83,count:363},
    {n:'37x OB Loaders',c:150,count:37},
    {n:'14x Coal Loaders',c:97,count:14},
    {n:'19x Dozer D375',c:130,count:19},
    {n:'36x Dozer D155',c:85,count:36},
    {n:'8x Grader',c:55,count:8},
  ];
  charts['costMon']=new Chart(ctx2,{type:'bar',data:{labels:fleetItems.map(f=>f.n),datasets:[{data:fleetItems.map(f=>r0(f.c*f.count*wh/1000)),backgroundColor:['#f59e0b','#3b82f6','#22c55e','#a855f7','#6366f1','#06b6d4'],borderRadius:5}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8b949e',font:{size:10}},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'Thousand USD/month',color:'#8b949e'}}}}
  });
  calcCostPerBCM();
}

function calcCostPerBCM(){
  const lk=document.getElementById('cost-loader')?.value||'PC2000';
  const nl=+document.getElementById('cost-nl')?.value||1;
  const nt=+document.getElementById('cost-nt')?.value||7;
  const nd=+document.getElementById('cost-nd')?.value||1;
  const ng=+document.getElementById('cost-ng')?.value||0;
  const dt=document.getElementById('cost-dtype')?.value||'D155';
  const fp=+document.getElementById('cost-prdty')?.value||700;
  const L=LOADERS[lk]||LOADERS['PC2000'];
  const T=TRUCKS['HD785'];
  const DC={D375:130,D155:85,D85:65};
  const lc=L.cost*nl,tc=T.cost*nt,dc=DC[dt]*nd,gc=55*ng;
  const tot=lc+tc+dc+gc;
  const setEl=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  setEl('cost-lhr',\`USD \${lc}/hr\`);setEl('cost-thr',\`USD \${tc}/hr\`);
  setEl('cost-dhr',\`USD \${dc}/hr\`);setEl('cost-ghr',ng>0?\`USD \${gc}/hr\`:'—');
  setEl('cost-tot',\`USD \${tot}/hr\`);
  setEl('cost-pbcm',fp>0?\`USD \${r2(tot/fp)}/BCM\`:'—');
}

// ═══════════════════════════════════════════════════════════════════════
// FLEET REFERENCE
// ═══════════════════════════════════════════════════════════════════════
function initFleetRef(){
  const tbody1=document.getElementById('ref-loader-tbody');
  if(tbody1)tbody1.innerHTML=Object.entries(LOADERS).map(([k,s])=>\`<tr>
    <td><strong>\${s.name}</strong></td><td><strong>\${s.prdty_ob}</strong></td><td>\${s.prdty_coal||'—'}</td>
    <td>\${r2(s.pa*100)}</td><td>\${r2(s.ua*100)}</td><td>\${s.wh}</td><td>\${s.ct}</td>
    <td>\${s.fuel.toFixed(1)}</td><td><strong>\${s.cost}</strong></td>
    <td><span class="status \${s.cat==='OB'?'info':s.cat==='COAL'?'ok':'warn'}">\${s.cat}</span></td>
  </tr>\`).join('');
  const tbody2=document.getElementById('ref-truck-tbody');
  if(tbody2)tbody2.innerHTML=Object.entries(TRUCKS).map(([k,s])=>\`<tr>
    <td><strong>\${s.name}</strong></td><td>\${s.pl_ob}</td><td>\${s.pl_coal}</td>
    <td>\${r2(s.pl_ob/1.78)}</td><td>\${s.sl_ob}</td><td>\${s.se_ob}</td>
    <td>\${r2(s.pa*100)}</td><td>\${s.fuel.toFixed(2)}</td><td><strong>\${s.cost}</strong></td>
  </tr>\`).join('');
  const tbody3=document.getElementById('ref-dozer-tbody');
  if(tbody3)tbody3.innerHTML=DOZERS.map(d=>\`<tr>
    <td><strong>\${d.name}</strong></td><td>\${d.power}</td><td>\${d.blade}</td>
    <td>\${r2(d.pa*100)}</td><td>\${r2(d.ua*100)}</td>
    <td>\${d.fuel.toFixed(0)}</td><td><strong>\${d.cost}</strong></td><td style="color:var(--text2);font-size:11px">\${d.role}</td>
  </tr>\`).join('');
  const tbody4=document.getElementById('ref-grader-tbody');
  if(tbody4)tbody4.innerHTML=GRADERS.map(g=>\`<tr>
    <td><strong>\${g.name}</strong></td><td>\${g.blade}</td>
    <td>\${r2(g.pa*100)}</td><td>\${r2(g.ua*100)}</td>
    <td>\${g.fuel.toFixed(0)}</td><td><strong>\${g.cost}</strong></td><td style="color:var(--text2);font-size:11px">\${g.role}</td>
  </tr>\`).join('');
  // Loader productivity chart
  dChart('refLoader');
  const ctx=document.getElementById('ch-ref-loader');if(!ctx)return;
  const ks=Object.keys(LOADERS);
  charts['refLoader']=new Chart(ctx,{type:'bar',data:{labels:ks.map(k=>LOADERS[k].name),datasets:[{label:'OB BCM/hr',data:ks.map(k=>LOADERS[k].prdty_ob),backgroundColor:'#f59e0b',borderRadius:4},{label:'Coal ton/hr',data:ks.map(k=>LOADERS[k].prdty_coal||0),backgroundColor:'rgba(59,130,246,.7)',borderRadius:4}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#8b949e',font:{size:11}}}},scales:{x:{ticks:{color:'#8b949e',font:{size:10}},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'bcm or ton/hr',color:'#8b949e'}}}}
  });
  // Support cost chart
  dChart('refSupport');
  const ctx2=document.getElementById('ch-ref-support');if(!ctx2)return;
  const all=[...DOZERS,...GRADERS];
  charts['refSupport']=new Chart(ctx2,{type:'bar',data:{labels:all.map(e=>e.name),datasets:[{label:'Fuel (USD/hr)',data:all.map(e=>e.fuel),backgroundColor:'#f59e0b',borderRadius:4},{label:'Total Cost (USD/hr)',data:all.map(e=>e.cost),backgroundColor:'rgba(239,68,68,.7)',borderRadius:4}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#8b949e',font:{size:11}}}},scales:{x:{ticks:{color:'#8b949e',font:{size:10}},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'USD/hr',color:'#8b949e'}}}}
  });
}

// ═══════════════════════════════════════════════════════════════════════
// DASHBOARD INIT
// ═══════════════════════════════════════════════════════════════════════
function initDashboard(){
  dChart('dbArea');
  const ctx1=document.getElementById('ch-db-area');
  if(ctx1)charts['dbArea']=new Chart(ctx1,{type:'bar',data:{labels:['PA1','PA2','PA3','PA4'],datasets:[{data:[13220645,6169037,2258724,3439097].map(v=>v/1e6),backgroundColor:['#f59e0b','#3b82f6','#22c55e','#a855f7'],borderRadius:5}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'Million BCM/month',color:'#8b949e'}}}}
  });
  dChart('dbMF');
  const mfVals=[0.938,0.942,0.934,0.941];
  const ctx2=document.getElementById('ch-db-mf');
  if(ctx2)charts['dbMF']=new Chart(ctx2,{type:'bar',data:{labels:['PA1','PA2','PA3','PA4'],datasets:[{data:mfVals,backgroundColor:mfVals.map(m=>mfColor(m)),borderRadius:5}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8b949e'},grid:{color:'#30363d'}},y:{min:0.8,max:1.2,ticks:{color:'#8b949e'},grid:{color:'#30363d'}}}}
  });
  dChart('dbFleet');
  const ctx3=document.getElementById('ch-db-fleet');
  if(ctx3)charts['dbFleet']=new Chart(ctx3,{type:'doughnut',data:{labels:['PA1','PA2','PA3','PA4','PSV/TS'],datasets:[{data:[97,106,47,113,9],backgroundColor:['#f59e0b','#3b82f6','#22c55e','#a855f7','#6366f1'],borderWidth:1,borderColor:'#30363d'}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'55%',plugins:{legend:{position:'right',labels:{color:'#8b949e',font:{size:10},boxWidth:10}}}}
  });
  dChart('dbLprdty');
  const ctx4=document.getElementById('ch-db-lprdty');
  if(ctx4){const ks=Object.keys(LOADERS).filter(k=>LOADERS[k].cat!=='COAL');
  charts['dbLprdty']=new Chart(ctx4,{type:'bar',data:{labels:ks.map(k=>LOADERS[k].name),datasets:[{data:ks.map(k=>LOADERS[k].prdty_ob),backgroundColor:ks.map((_,i)=>['#f59e0b','#3b82f6','#22c55e','#a855f7','#f97316'][i%5]),borderRadius:4}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8b949e',font:{size:9}},grid:{color:'#30363d'}},y:{ticks:{color:'#8b949e'},grid:{color:'#30363d'},title:{display:true,text:'BCM/hr',color:'#8b949e'}}}}
  });}
  // Area table
  const tbody=document.getElementById('db-area-tbody');if(!tbody)return;
  tbody.innerHTML=OB_AREAS.map(a=>{
    const cls=a.mf_a>=0.9&&a.mf_a<=1.1?'ok':a.mf_a<0.9?'crit':'warn';
    return \`<tr><td><strong>\${a.area}</strong></td><td>\${a.pit}</td><td>\${a.loader}</td><td>\${a.nl}</td><td>\${a.dist}</td>
      <td>\${a.prdty} bcm/hr</td><td>\${a.mf_s}</td>
      <td><span class="status \${cls}">\${a.mf_a.toFixed(3)}</span></td>
      <td><strong>\${a.needdt}</strong></td><td>\${a.hari}</td>
      <td>\${fmtK(a.prod)}</td>
      <td><span class="status \${cls}">\${cls==='ok'?'✓ OK':cls==='crit'?'LOADER WAIT':'OVERFLEET'}</span></td></tr>\`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════════════════════════════
function initReport(){
  const now=new Date();
  document.getElementById('rep-date').textContent=now.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
  const wx=wxData;
  document.getElementById('rep-wx').textContent=\`Rain: \${wx.rain||75.7}h + Slippery: \${wx.slip||43.4}h + Haze: \${wx.haze||0}h = \${Math.round((wx.rain||75.7)+(wx.slip||43.4)+(wx.haze||0))}h/month\`;
  // OB table
  const obT=document.getElementById('rep-ob-tbody');
  if(obT){
    const obData=monthlyOB.length>0?monthlyOB.map(r=>{
      const ctl=(91/1.78/r.prdty)*60;
      const ct=ctl+0.5+(r.dist/18)*60+2+(r.dist/25)*60;
      const mf=r3((r.nt*ctl)/ct);
      const needdt=Math.ceil(0.95*ct/ctl);
      const mon=r0(r.prdty*(r.pa/100)*(r.ua/100)*r.nl*(wxData.wh_eff||14.18)*30);
      const cls=mfStatus(mf).cls;
      return \`<tr><td>\${r.area}</td><td>\${r.loader}</td><td>\${r.nl}</td><td>\${r.nt}</td><td>\${r.dist}</td>
        <td>\${r.pa}%</td><td>\${r.ua}%</td><td><span class="status \${cls}">\${mf.toFixed(3)}</span></td>
        <td><strong>\${needdt}</strong></td><td>\${fmtK(mon)} BCM</td><td><span class="status \${cls}">\${mf>=0.9&&mf<=1.1?'OK':'CHECK'}</span></td></tr>\`;
    }):OB_AREAS.map(a=>{
      const cls=a.mf_a>=0.9&&a.mf_a<=1.1?'ok':a.mf_a<0.9?'crit':'warn';
      return \`<tr><td>\${a.area}/\${a.pit}</td><td>\${a.loader}</td><td>\${a.nl}</td><td>\${a.needdt}</td>
        <td>\${a.dist}</td><td>94%</td><td>62.8%</td><td><span class="status \${cls}">\${a.mf_a.toFixed(3)}</span></td>
        <td>\${a.needdt}</td><td>\${fmtK(a.prod)} BCM</td><td><span class="status \${cls}">\${cls==='ok'?'OK':'CHECK'}</span></td></tr>\`;
    });
    obT.innerHTML=obData.join('');
  }
  // Coal table
  const clT=document.getElementById('rep-coal-tbody');
  if(clT){
    const clData=monthlyCoal.length>0?monthlyCoal.map(r=>{
      const ctl=(55/r.prdty)*60;
      const ct=ctl+0.5+(r.dist/40)*60+2+(r.dist/60)*60;
      const mf=r3((r.nt*ctl)/ct);
      const needdt=Math.ceil(0.95*ct/ctl);
      const mon=r0(r.prdty*(r.pa/100)*(r.ua/100)*r.nl*(wxData.wh_eff||14)*30);
      const cls=mfStatus(mf).cls;
      return \`<tr><td>\${r.area}</td><td>\${r.loader}</td><td>\${r.nl}</td><td>\${r.nt}</td><td>\${r.dist}</td>
        <td>\${r.pa}%</td><td>\${r.ua}%</td><td><span class="status \${cls}">\${mf.toFixed(3)}</span></td>
        <td>\${needdt}</td><td>\${fmtK(mon)} ton</td><td><span class="status \${cls}">\${mf>=0.85&&mf<=1.1?'OK':'CHECK'}</span></td></tr>\`;
    }):COAL_AREAS.map(a=>{
      const cls=a.mf_a>=0.85&&a.mf_a<=1.1?'ok':a.mf_a<0.85?'crit':'warn';
      return \`<tr><td>\${a.area}/\${a.pit}</td><td>\${a.loader}</td><td>\${a.nl}</td><td>\${a.needdt}</td>
        <td>\${a.dist}</td><td>93%</td><td>62%</td><td><span class="status \${cls}">\${a.mf_a.toFixed(3)}</span></td>
        <td>\${a.needdt}</td><td>\${fmtK(a.prod)} ton</td><td><span class="status \${cls}">\${cls==='ok'?'OK':'CHECK'}</span></td></tr>\`;
    });
    clT.innerHTML=clData.join('');
  }
  // Support table
  const supT=document.getElementById('rep-support-tbody');
  if(supT)supT.innerHTML=monthlySupport.map(r=>\`<tr><td>\${r.area}</td><td>\${r.type}</td><td>\${r.n}</td><td>\${r.pa}%</td><td>\${r.ua}%</td><td>\${r.role}</td><td>USD \${r.cost}/hr</td><td>—</td></tr>\`).join('');
  // Weather summary
  const wx2=wxData;
  const wEl=document.getElementById('rep-weather');
  if(wEl)wEl.innerHTML=\`
    <div><p class="mb4"><strong>Rain:</strong> \${wx2.rain||75.7} hrs/month</p>
      <p class="mb4"><strong>Slippery:</strong> \${wx2.slip||43.4} hrs/month</p>
      <p class="mb4"><strong>Haze:</strong> \${wx2.haze||0} hrs/month</p></div>
    <div><p class="mb4"><strong>Delay:</strong> \${wx2.delay||215} min/day</p>
      <p class="mb4"><strong>WH Effective:</strong> \${r2(wx2.wh_eff||14.18)} hrs/day</p>
      <p class="mb4"><strong>WH Efficiency:</strong> \${wx2.eff_pct||59.1}%</p></div>
    <div><p class="mb4"><strong>Working Days:</strong> \${wx2.days||30}</p>
      <p class="mb4"><strong>Adj. UA:</strong> \${wx2.ua_adj||62.8}%</p>
      <p class="mb4"><strong>Total Loss:</strong> \${r0(wx2.total_loss||119)} hrs/month</p></div>\`;
}

function exportReport(){
  const data={generated:new Date().toISOString(),ob_fleet:monthlyOB,coal_fleet:monthlyCoal,support:monthlySupport,weather:wxData,scenarios};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='mineflow_report_'+new Date().toISOString().slice(0,10)+'.json';a.click();
}

// ═══════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════
const TAB_TITLES={'dashboard':'Executive Dashboard','monthly':'Monthly Fleet Setting','ob-sim':'OB Fleet Simulator','coal-sim':'Coal Fleet Simulator','phr':'PHR / SR Analysis','dt-traffic':'DT Traffic Density Simulator','fleet-ref':'Fleet Reference','scenario':'Scenario Compare','cost':'Cost Analysis','report':'Monthly Report'};

document.querySelectorAll('.sb-nav a').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const tab=a.dataset.tab;
    document.querySelectorAll('.sb-nav a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    const sec=document.getElementById('tab-'+tab);if(sec)sec.classList.add('active');
    document.getElementById('topbar-title').textContent=TAB_TITLES[tab]||tab;
    // Lazy init
    if(tab==='fleet-ref')initFleetRef();
    if(tab==='cost')initCostAnalysis();
    if(tab==='phr')calcPHR();
    if(tab==='ob-sim')runOBSim();
    if(tab==='coal-sim')runCoalSim();
    if(tab==='dt-traffic')dtFullUpdate();
    if(tab==='report')initReport();
    if(tab==='monthly'){calcWeather();renderOBTable();renderCoalTable();renderSupportTable();recalcMonthlyTotals();}
  });
});

function toggleSidebar(){
  const sb=document.getElementById('sidebar');
  sb.classList.toggle('open');
  sb.style.display=sb.style.display==='none'||sb.style.display===''?'flex':'none';
}

// ═══════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded',()=>{
  const now=new Date();
  const dateEl=document.getElementById('topbar-date');
  if(dateEl)dateEl.textContent=now.toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});

  // Init weather
  calcWeather();

  // Populate monthly table from real data
  OB_AREAS.forEach(a=>monthlyOB.push({id:Date.now()+Math.random(),area:a.area+'/'+a.pit,loader:a.loader,nl:a.nl,prdty:a.prdty,pa:94,ua:r2(wxData.ua_adj||62.8),dist:a.dist,nt:a.needdt}));
  COAL_AREAS.forEach(a=>monthlyCoal.push({id:Date.now()+Math.random(),area:a.area,loader:a.loader,nl:a.nl,prdty:a.prdty,pa:93,ua:r2(wxData.ua_adj||62),dist:a.dist,nt:a.needdt}));
  monthlySupport=[
    {id:1,area:'PA1-PA4',type:'D375',n:6,pa:92,ua:78,role:'OB Spreader',cost:130},
    {id:2,area:'PA1-PA4',type:'D155',n:12,pa:91,ua:77,role:'Compactor',cost:85},
    {id:3,area:'All',type:'GD825',n:4,pa:91,ua:76,role:'Road Maintenance',cost:55},
  ];

  // Init dashboard
  initDashboard();

  // Lazy init sims with delay
  setTimeout(()=>{
    runOBSim();
    runCoalSim();
    calcPHR();
    dtFullUpdate();
  },300);
});

window.addEventListener('resize',()=>{if(document.getElementById('tab-dt-traffic').classList.contains('active'))dtUpdateRoadVis(...Object.values(dtCalcAll()).slice(0,3));});
</script>
</body>
</html>
`;

const MineFlowPage = () => {
  const iframeRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const timer = setTimeout(() => setIsLoaded(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleFullscreen = () => {
    const iframe = iframeRef.current;
    if (!isFullscreen) {
      if (iframe.requestFullscreen) iframe.requestFullscreen();
      else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e17', color: '#e6edf3', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
        borderBottom: '1px solid #21262d',
        padding: '32px 32px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative glow */}
        <div style={{
          position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '200px',
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: '20px', padding: '4px 12px', marginBottom: '12px'
              }}>
                <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  ⛏ Operations Research Platform
                </span>
              </div>
              <h1 style={{
                fontSize: '32px', fontWeight: '800', margin: '0 0 6px',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                MineFlow AI v3.0
              </h1>
              <p style={{ fontSize: '14px', color: '#8b949e', margin: 0 }}>
                Fleet Productivity & Dispatch Simulation Platform — by <strong style={{ color: '#e6edf3' }}>Fastabiq Rahmat Imanu</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'OB Simulator', color: '#3b82f6' },
                { label: 'Coal Simulator', color: '#22c55e' },
                { label: 'DT Traffic', color: '#a855f7' },
                { label: 'Cost Analysis', color: '#f59e0b' },
              ].map(tag => (
                <span key={tag.label} style={{
                  fontSize: '10px', fontWeight: '700', padding: '3px 9px', borderRadius: '6px',
                  background: tag.color + '18', color: tag.color,
                  border: '1px solid ' + tag.color + '35', letterSpacing: '0.3px', textTransform: 'uppercase'
                }}>{tag.label}</span>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div style={{
            display: 'flex', gap: '24px', marginTop: '20px', paddingTop: '20px',
            borderTop: '1px solid #21262d', flexWrap: 'wrap'
          }}>
            {[
              { val: '10', label: 'Dashboard Modules', color: '#f59e0b' },
              { val: '4', label: 'OB Areas', color: '#3b82f6' },
              { val: '3', label: 'Coal Areas', color: '#22c55e' },
              { val: 'Live', label: 'Simulation Engine', color: '#a855f7' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: s.color }}>{s.val}</span>
                <span style={{ fontSize: '11px', color: '#6e7681', lineHeight: '1.3' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Container */}
      <div style={{ padding: '20px 32px 40px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '12px', flexWrap: 'wrap', gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: isLoaded ? '#22c55e' : '#f59e0b',
              boxShadow: isLoaded ? '0 0 6px #22c55e' : '0 0 6px #f59e0b',
              transition: 'all 0.3s'
            }} />
            <span style={{ fontSize: '11px', color: '#8b949e' }}>
              {isLoaded ? 'Dashboard loaded & running' : 'Initializing simulation engine...'}
            </span>
          </div>
          <button
            onClick={toggleFullscreen}
            style={{
              background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
              color: '#f59e0b', padding: '5px 14px', borderRadius: '6px',
              fontSize: '11.5px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: '5px'
            }}
          >
            ⛶ {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>

        {/* iFrame wrapper */}
        <div style={{
          borderRadius: '12px', overflow: 'hidden',
          border: '1px solid #30363d',
          boxShadow: '0 0 0 1px rgba(245,158,11,0.05), 0 24px 60px rgba(0,0,0,0.5)',
          position: 'relative'
        }}>
          {/* Chrome bar */}
          <div style={{
            background: '#161b22', borderBottom: '1px solid #21262d',
            padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', opacity: 0.8 }} />
            <span style={{
              marginLeft: '10px', fontSize: '10.5px', color: '#6e7681',
              fontFamily: 'monospace', flex: 1, textAlign: 'center', paddingRight: '30px'
            }}>
              mineflow-ai-v3.0 — fleet-productivity-platform
            </span>
          </div>

          {!isLoaded && (
            <div style={{
              position: 'absolute', top: '40px', left: 0, right: 0, bottom: 0,
              background: '#0d1117', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', zIndex: 10, gap: '14px'
            }}>
              <div style={{ fontSize: '32px' }}>⛏</div>
              <div style={{ fontSize: '14px', color: '#f59e0b', fontWeight: '700' }}>Loading MineFlow AI...</div>
              <div style={{
                width: '200px', height: '3px', background: '#21262d', borderRadius: '2px', overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                  borderRadius: '2px', animation: 'loadbar 0.6s ease-out forwards',
                  width: '0%'
                }} />
              </div>
              <style>{`@keyframes loadbar { to { width: 100% } }`}</style>
            </div>
          )}

          <iframe
            ref={iframeRef}
            srcDoc={MINEFLOW_HTML}
            title="MineFlow AI v3.0 - Fleet Productivity Dashboard"
            style={{
              width: '100%',
              height: '88vh',
              border: 'none',
              display: 'block',
              background: '#0d1117'
            }}
            onLoad={() => setIsLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>

        {/* Footer info */}
        <div style={{
          marginTop: '20px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '10px',
          fontSize: '11px', color: '#6e7681'
        }}>
          <span>© 2025 Fastabiq Rahmat Imanu — MineFlow AI Platform</span>
          <span style={{ fontFamily: 'monospace' }}>v3.0.0 · Operations Research · Mining Fleet Intelligence</span>
        </div>
      </div>
    </div>
  );
};

export default MineFlowPage;
