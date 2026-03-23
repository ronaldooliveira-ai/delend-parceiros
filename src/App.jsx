import { useState, useEffect, useMemo } from "react";

const EMPRESAS = [
  { id:1, tipo:"Parceiro Conta Azul", erp:"Conta Azul",
    nome:"Valoreasy BPO Financeiro",
    regiao:"SP (online)", site:"valoreasy.com.br",
    linkedin:"https://www.linkedin.com/company/valoreasy",
    func:"5–10",
    decisor:"CEO / Fundador — buscar em /people no LinkedIn",
    evidencia:"3.4k seguidores LinkedIn. Usa Conta Azul e Omie. Parceira de outras fintechs.",
    comoRevender:"Já indica software. Adicionar Delend ao stack de inadimplência.",
  },
  { id:2, tipo:"Parceiro Conta Azul", erp:"Conta Azul",
    nome:"Zumis Consultoria BPO",
    regiao:"SP (online)", site:"zumis.com.br",
    linkedin:"https://www.linkedin.com/company/zumis",
    func:"5–10",
    decisor:"Sócio-fundador — buscar em /people",
    evidencia:"BPO consultivo com contratos mensais. Sem produto de cobrança.",
    comoRevender:"Indica ferramentas rotineiramente. Delend entra como módulo de inadimplência.",
  },
  { id:3, tipo:"Parceiro Conta Azul", erp:"Conta Azul",
    nome:"BPO Space (Comunidade + BPO)",
    regiao:"Nacional", site:"blog.bpospace.com.br",
    linkedin:"https://www.linkedin.com/company/bpo-space",
    func:"5–10",
    decisor:"Fundador BPO Space — CEO / Creator",
    evidencia:"Blog com artigos sobre ERPs para BPO. Audiência de outros BPOs.",
    comoRevender:"Um post pode ativar dezenas de BPOs parceiros.",
  },
  { id:4, tipo:"Parceiro Conta Azul", erp:"Conta Azul",
    nome:"Nuvem Contábil BPO",
    regiao:"SP / Nacional", site:"contabilidadenanuvem.com.br",
    linkedin:"https://www.linkedin.com/company/nuvem-contabil",
    func:"5–10",
    decisor:"CEO / Fundador Nuvem Contábil",
    evidencia:"Compara Conta Azul, Nibo e Omie ativamente. Recomenda ferramentas.",
    comoRevender:"Adicionar Delend à análise como solução complementar de cobrança.",
  },
  { id:5, tipo:"Parceiro Conta Azul", erp:"Conta Azul",
    nome:"Folha Verde BPO Financeiro",
    regiao:"SP", site:"fvbpofinanceiro.com.br",
    linkedin:"https://www.linkedin.com/company/folha-verde-bpo",
    func:"5–10",
    decisor:"Fundador Folha Verde — CEO",
    evidencia:"CFO externo + BPO para PMEs. Gestão ativa de inadimplência.",
    comoRevender:"Delend entra como camada SaaS no pacote BPO — nova receita.",
  },
  { id:6, tipo:"Parceiro Conta Azul", erp:"Conta Azul",
    nome:"Plano PJ Consultoria Financeira",
    regiao:"Nacional (online)", site:"planopj.com.br",
    linkedin:"https://www.linkedin.com/company/planopj",
    func:"5–10",
    decisor:"CEO / Fundador Plano PJ",
    evidencia:"CFO externo digital. Gestão de AR e cobrança de inadimplentes como serviço.",
    comoRevender:"Delend automatiza o follow-up que eles fazem manualmente.",
  },
  { id:7, tipo:"Parceiro Omie", erp:"Omie",
    nome:"Meu Contador Online (BPO + Omie)",
    regiao:"SP / Nacional", site:"meucontadoronline.com.br",
    linkedin:"https://www.linkedin.com/company/meu-contador-online",
    func:"5–10",
    decisor:"CEO / Fundador — buscar em /people",
    evidencia:"Canal ativo de software para clientes. DNA de revenda de ferramentas.",
    comoRevender:"Já orienta clientes sobre qual software usar. Adicionar Delend à recomendação.",
  },
  { id:8, tipo:"Parceiro Omie", erp:"Omie",
    nome:"Lucrar Mais Contabilidade",
    regiao:"SP", site:"vemlucrarmais.com.br",
    linkedin:"https://www.linkedin.com/company/lucrar-mais",
    func:"5–10",
    decisor:"CEO / Sócio-fundador",
    evidencia:"Site descreve 'follow-up ativo de inadimplentes' como serviço central.",
    comoRevender:"Delend entrega automaticamente o que eles prometem: redução de inadimplência.",
  },
  { id:9, tipo:"Parceiro Omie", erp:"Omie",
    nome:"Comece com o Pé Direito",
    regiao:"SP / Nacional", site:"comececomopedireito.com.br",
    linkedin:"https://www.linkedin.com/company/comece-com-o-pe-direito",
    func:"5–10",
    decisor:"Fundadoras CCPD — CEO / Co-fundadora",
    evidencia:"BPO para startups + parceira Conta Azul. Já indica parceiros externos.",
    comoRevender:"Delend entra no ecossistema delas como parceiro formal de indicação.",
  },
  { id:10, tipo:"Parceiro Omie", erp:"Omie",
    nome:"FinHasse — Infra Financeira",
    regiao:"SP / Nacional", site:"finhasse.com.br",
    linkedin:"https://www.linkedin.com/company/finhasse",
    func:"5–10",
    decisor:"CEO / Co-fundador FinHasse",
    evidencia:"CFO Service para Startups e SaaS. Integra ferramentas externas para clientes.",
    comoRevender:"SaaS com churn por inadimplência. Delend reduz LTV loss.",
  },
  { id:11, tipo:"Parceiro Nibo", erp:"Nibo",
    nome:"HubCount Tecnologia Contábil",
    regiao:"SP / Nacional", site:"hubcount.com.br",
    linkedin:"https://www.linkedin.com/company/hubcount",
    func:"5–10",
    decisor:"CEO / Fundador HubCount",
    evidencia:"Plataforma para escritórios contábeis + BPO. Rede de parceiros.",
    comoRevender:"Acordo com HubCount ativa rede de escritórios que usam a plataforma.",
  },
  { id:12, tipo:"BPO Independente", erp:"Multi",
    nome:"Recíproka Consultoria",
    regiao:"SP / SC", site:"reciproka.com.br",
    linkedin:"https://www.linkedin.com/company/reciproka",
    func:"5–10",
    decisor:"Graziela Bernardo · Vanessa Custodio (Co-fundadoras)",
    evidencia:"Parceira oficial Triven. Modelo de ecossistema de parceiros explícito.",
    comoRevender:"Já integram ferramentas externas. Delend entra como próximo parceiro.",
  },
  { id:13, tipo:"BPO Independente", erp:"Multi",
    nome:"Soul Finance CFO as a Service",
    regiao:"SP / Nacional", site:"soulfinance.com.br",
    linkedin:"https://www.linkedin.com/company/soul-finance",
    func:"5–10",
    decisor:"José Luiz — Sócio-fundador",
    evidencia:"Clientes citam 'organização de pagamentos'. Atuam com startups e scale-ups.",
    comoRevender:"Clientes têm B2B com inadimplência. Delend gera comissão mensal.",
  },
  { id:14, tipo:"BPO Independente", erp:"Multi",
    nome:"Crescento Consultoria Financeira",
    regiao:"SP / Nacional", site:"crescento.com.br",
    linkedin:"https://www.linkedin.com/company/crescento-consultoria-financeira",
    func:"5–10",
    decisor:"CEO / Fundador Crescento",
    evidencia:"BPO + CFO as a Service + cursos. Base de PMEs com acesso direto ao AR.",
    comoRevender:"Curso + consultoria + Delend = upsell natural para clientes.",
  },
  { id:15, tipo:"BPO Independente", erp:"Multi",
    nome:"JRX Contabilidade BPO",
    regiao:"SP / Nacional", site:"jrxcontabilidade.com.br",
    linkedin:"https://www.linkedin.com/company/jrx-contabilidade",
    func:"5–10",
    decisor:"CEO / Sócio-fundador JRX",
    evidencia:"CFO fracionado para startups. Foco em MRR, churn, CAC — base B2B.",
    comoRevender:"Startups perdem MRR por inadimplência. Delend resolve isso.",
  },
  { id:16, tipo:"Contabilidade Consultiva", erp:"Conta Azul",
    nome:"Contbank Plataforma BPO",
    regiao:"SP / Nacional", site:"contbank.com",
    linkedin:"https://www.linkedin.com/company/contbank",
    func:"5–10",
    decisor:"CEO / Fundador Contbank",
    evidencia:"Blog aponta gap de cobrança inteligente no BPO. Integração com Omie.",
    comoRevender:"Integrar Delend na plataforma BPO Suite distribui para toda a rede.",
  },
  { id:17, tipo:"Contabilidade Consultiva", erp:"Multi",
    nome:"Ecofinanças BPO Financeiro",
    regiao:"SP — Av. Faria Lima", site:"ecofinancas.com.br",
    linkedin:"https://www.linkedin.com/company/ecofinancas",
    func:"5–10",
    decisor:"Sócio-fundador Ecofinanças",
    evidencia:"BPO + reestruturação financeira. Faria Lima = base B2B qualificada.",
    comoRevender:"Clientes B2B com inadimplência complexa. Delend profissionaliza o AR.",
  },
  { id:18, tipo:"Contabilidade Consultiva", erp:"Multi",
    nome:"Apollo Gestão Financeira RS",
    regiao:"Porto Alegre / Nacional", site:"gestaoapollo.com.br",
    linkedin:"https://www.linkedin.com/company/apollo-gestao-financeira",
    func:"5–10",
    decisor:"CEO / Fundador Apollo",
    evidencia:"BPO + CFO as a Service para PMEs. Sem solução de cobrança.",
    comoRevender:"PMEs do Sul com B2B. Delend como add-on no pacote BPO.",
  },
  { id:19, tipo:"🔍 Estratégia de Busca", erp:"LinkedIn",
    nome:"🔍 Parceiros Conta Azul certificados",
    regiao:"Nacional",
    site:"linkedin.com/search",
    linkedin:"https://www.linkedin.com/search/results/companies/?keywords=BPO+financeiro+parceiro+conta+azul",
    func:"5–10",
    decisor:"Filtrar '2–10 func' → SP → abrir empresa → /people → CEO ou Fundador",
    evidencia:"1.000+ parceiros Conta Azul no Brasil. Maioria são micro-BPOs de 5–10 func.",
    comoRevender:"Cada parceiro Conta Azul já tem modelo de comissão ativo — trivial adicionar Delend.",
  },
  { id:20, tipo:"🔍 Estratégia de Busca", erp:"LinkedIn",
    nome:"🔍 BPO financeiro 2-10 funcionários",
    regiao:"Nacional",
    site:"linkedin.com/search",
    linkedin:"https://www.linkedin.com/search/results/companies/?keywords=BPO+financeiro&companySize=B",
    func:"5–10",
    decisor:"Filtrar tamanho '2–10' → setor 'Serviços financeiros' → abrir perfis",
    evidencia:"Dezenas de micro-BPOs aparecem nessa busca.",
    comoRevender:"Cada um tem um founder que decide em 1 reunião.",
  },
];

const STATUS = {
  pendente:   { label:"Pendente",       emoji:"⏳", c:"#64748B", bg:"#64748B12", bd:"#64748B30" },
  tentei:     { label:"Tentei",         emoji:"📨", c:"#F59E0B", bg:"#F59E0B12", bd:"#F59E0B35" },
  em_contato: { label:"Em contato",     emoji:"💬", c:"#3B82F6", bg:"#3B82F612", bd:"#3B82F635" },
  reuniao:    { label:"Reunião",        emoji:"📅", c:"#8B5CF6", bg:"#8B5CF612", bd:"#8B5CF635" },
  revendendo: { label:"Revendendo! 🎯", emoji:"🤝", c:"#10B981", bg:"#10B98112", bd:"#10B98135" },
  descartado: { label:"Descartado",     emoji:"🚫", c:"#EF4444", bg:"#EF444412", bd:"#EF444435" },
};

const TIPO_COLOR = {
  "Parceiro Conta Azul":     "#1565C0",
  "Parceiro Omie":           "#6200EA",
  "Parceiro Nibo":           "#00838F",
  "BPO Independente":        "#2E7D32",
  "Contabilidade Consultiva":"#E65100",
  "🔍 Estratégia de Busca":  "#334155",
};

const KEY = "delend_micro_v1";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY))||{}; } catch { return {}; } };
export default function App() {
  const [est, setEst]       = useState(load);
  const [filtro, setFiltro] = useState("pendente");
  const [tipo, setTipo]     = useState("Todos");
  const [open, setOpen]     = useState(null);
  const [notas, setNotas]   = useState({});
  const [flash, setFlash]   = useState(null);

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(est)); } catch {} }, [est]);

  const getS  = id => est[id]?.status || "pendente";
  const getN  = id => est[id]?.nota   || "";

  function muda(id, s) {
    setEst(p => ({ ...p, [id]: { ...p[id], status:s, ts:Date.now() } }));
    setFlash(id); setTimeout(()=>setFlash(null), 700);
    if (filtro !== "todos" && filtro !== s) setOpen(null);
  }
  function salva(id) {
    const t = notas[id] !== undefined ? notas[id] : getN(id);
    setEst(p=>({...p,[id]:{...p[id],nota:t}}));
    setNotas(p=>{const n={...p};delete n[id];return n;});
  }

  const tipos = ["Todos",...new Set(EMPRESAS.map(e=>e.tipo))];

  const lista = useMemo(()=>
    EMPRESAS.filter(e=>(filtro==="todos"||getS(e.id)===filtro)&&(tipo==="Todos"||e.tipo===tipo))
  ,[filtro,tipo,est]);

  const counts = useMemo(()=>{
    const c={};Object.keys(STATUS).forEach(s=>{c[s]=0;});
    EMPRESAS.forEach(e=>{const s=getS(e.id);c[s]=(c[s]||0)+1;});
    return c;
  },[est]);

  const prog = Math.round(EMPRESAS.filter(e=>getS(e.id)!=="pendente").length/EMPRESAS.length*100);
  const proxima = lista.find(e=>getS(e.id)==="pendente");

  return (
    <div style={{fontFamily:"'IBM Plex Sans','Segoe UI',sans-serif",background:"#04080F",minHeight:"100vh",color:"#C8D6E8"}}>
      <div style={{background:"linear-gradient(160deg,#0A1628,#04080F)",borderBottom:"1px solid #ffffff08",padding:"18px 20px"}}>
        <div style={{maxWidth:880,margin:"0 auto"}}>
          <div style={{fontSize:9,letterSpacing:3,color:"#10B981",fontWeight:700,textTransform:"uppercase",marginBottom:3}}>
            ▶ DELEND · Micro-BPOs · 5–10 func · Já revendem software
          </div>
          <h1 style={{fontSize:"clamp(14px,2.5vw,20px)",fontWeight:900,color:"#fff",margin:"0 0 3px"}}>
            {EMPRESAS.length} empresas — donos decidem sozinhos
          </h1>
          <p style={{color:"#334155",fontSize:11,margin:"0 0 12px"}}>
            BPOs que já ganham comissão de Omie / Conta Azul / Nibo
          </p>
          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
              <span style={{fontSize:10,color:"#334155"}}>Progresso</span>
              <span style={{fontSize:10,color:"#10B981",fontWeight:700}}>{prog}% abordadas</span>
            </div>
            <div style={{height:5,background:"#ffffff08",borderRadius:10,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${prog}%`,background:"linear-gradient(90deg,#1565C0,#10B981)",transition:"width 0.4s"}}/>
            </div>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
            {Object.entries(STATUS).map(([k,s])=>(
              <button key={k} onClick={()=>setFiltro(k)}
                style={{padding:"4px 10px",borderRadius:14,border:`1px solid ${filtro===k?s.bd:"#ffffff10"}`,
                  background:filtro===k?s.bg:"transparent",color:filtro===k?s.c:"#334155",
                  fontSize:10,fontWeight:600,cursor:"pointer"}}>
                {s.emoji} {s.label} <span style={{background:"#ffffff10",borderRadius:8,padding:"0 5px",fontSize:9}}>{counts[k]}</span>
              </button>
            ))}
            <button onClick={()=>setFiltro("todos")}
              style={{padding:"4px 10px",borderRadius:14,border:`1px solid ${filtro==="todos"?"#ffffff30":"#ffffff08"}`,
                background:filtro==="todos"?"#ffffff08":"transparent",color:"#64748B",fontSize:10,cursor:"pointer"}}>
              Todas ({EMPRESAS.length})
            </button>
          </div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {tipos.map(t=>{const c=TIPO_COLOR[t]||"#888";return(
              <button key={t} onClick={()=>setTipo(t)}
                style={{padding:"3px 9px",borderRadius:10,
                  border:`1px solid ${tipo===t?c+"50":"#ffffff08"}`,
                  background:tipo===t?`${c}15`:"transparent",
                  color:tipo===t?c:"#334155",fontSize:9,fontWeight:600,cursor:"pointer"}}>
                {t}
              </button>
            );})}
          </div>
        </div>
      </div>
      <div style={{maxWidth:880,margin:"0 auto",padding:"12px 20px 40px"}}>
        {filtro==="pendente" && proxima && <ProxCard e={proxima} onAv={muda}/>}
        {lista.length===0 ?(
          <div style={{textAlign:"center",padding:60,color:"#1E3A5F",fontSize:13}}>
            {filtro==="pendente"?"🎯 Todas abordadas!":"Nenhuma empresa neste filtro."}
          </div>
        ):lista.map(e=>(
          <Row key={e.id} e={e}
            status={getS(e.id)} nota={getN(e.id)} edit={notas[e.id]}
            isOpen={open===e.id} isFlash={flash===e.id}
            onToggle={()=>setOpen(open===e.id?null:e.id)}
            onStatus={s=>muda(e.id,s)}
            onEdit={t=>setNotas(p=>({...p,[e.id]:t}))}
            onSave={()=>salva(e.id)}
          />
        ))}
        <div style={{textAlign:"center",marginTop:14,fontSize:9,color:"#0F172A"}}>
          DELEND · {EMPRESAS.length} MICRO-BPOs · MAR/2026
        </div>
      </div>
    </div>
  );
}
function ProxCard({e,onAv}){
  const tc=TIPO_COLOR[e.tipo]||"#888";
  return(
    <div style={{marginBottom:16,padding:"16px 18px",background:"linear-gradient(135deg,#0A1628,#060e1e)",
      border:"1px solid #10B98130",borderRadius:14}}>
      <div style={{fontSize:9,letterSpacing:3,color:"#10B981",fontWeight:700,textTransform:"uppercase",marginBottom:8}}>⚡ PRÓXIMA DA FILA</div>
      <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"flex-start"}}>
        <div style={{flex:1,minWidth:200}}>
          <div style={{fontSize:15,fontWeight:800,color:"#fff",marginBottom:2}}>{e.nome}</div>
          <div style={{fontSize:11,color:"#4A6080",marginBottom:6}}>{e.regiao} · {e.func} func.</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
            <span style={{fontSize:9,padding:"2px 8px",borderRadius:6,background:`${tc}18`,color:tc,border:`1px solid ${tc}30`,fontWeight:700}}>{e.tipo}</span>
            <span style={{fontSize:9,padding:"2px 8px",borderRadius:6,background:"#ffffff08",color:"#64748B"}}>{e.erp}</span>
          </div>
          <div style={{fontSize:11,color:"#94A3B8",lineHeight:1.6,marginBottom:6}}>{e.evidencia}</div>
          <div style={{fontSize:11,color:"#10B981",lineHeight:1.5,padding:"8px 10px",background:"#10B98108",borderRadius:7,border:"1px solid #10B98118"}}>
            <strong>Como revender:</strong> {e.comoRevender}
          </div>
          <div style={{fontSize:11,color:"#FBBF24",marginTop:8}}>👤 {e.decisor}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          <a href={e.linkedin} target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:5,padding:"8px 14px",borderRadius:8,
              background:"#0A66C215",border:"1px solid #0A66C230",color:"#60A5FA",fontSize:11,fontWeight:700,textDecoration:"none"}}>
            🔗 LinkedIn
          </a>
          <button onClick={()=>onAv(e.id,"tentei")}
            style={{padding:"8px 14px",borderRadius:8,border:"1px solid #F59E0B35",background:"#F59E0B12",color:"#F59E0B",fontSize:11,fontWeight:700,cursor:"pointer"}}>
            📨 Tentei contato
          </button>
          <button onClick={()=>onAv(e.id,"em_contato")}
            style={{padding:"8px 14px",borderRadius:8,border:"1px solid #3B82F635",background:"#3B82F612",color:"#3B82F6",fontSize:11,fontWeight:700,cursor:"pointer"}}>
            💬 Respondeu
          </button>
          <button onClick={()=>onAv(e.id,"revendendo")}
            style={{padding:"8px 14px",borderRadius:8,border:"1px solid #10B98135",background:"#10B98112",color:"#10B981",fontSize:11,fontWeight:700,cursor:"pointer"}}>
            🤝 Fechou parceria!
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({e,status,nota,edit,isOpen,isFlash,onToggle,onStatus,onEdit,onSave}){
  const sc=STATUS[status];
  const tc=TIPO_COLOR[e.tipo]||"#607D8B";
  const txt=edit!==undefined?edit:nota;
  return(
    <div style={{marginBottom:5,borderRadius:10,overflow:"hidden",
      border:`1px solid ${isOpen?sc.bd:isFlash?"#10B98145":"#ffffff06"}`,
      background:isFlash?"#10B98108":isOpen?"#060e1e":"#ffffff02",transition:"all 0.2s"}}>
      <div onClick={onToggle} style={{padding:"10px 14px",cursor:"pointer",
        display:"grid",gridTemplateColumns:"20px 1fr auto auto 12px",gap:10,alignItems:"center"}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:sc.c,margin:"auto"}}/>
        <div>
          <div style={{fontSize:12,fontWeight:700,color:"#D0E0F0"}}>{e.nome}</div>
          <div style={{fontSize:9,color:"#334155",marginTop:1}}>{e.regiao} · {e.func} func · {e.erp}</div>
        </div>
        <span style={{fontSize:8,padding:"2px 7px",borderRadius:6,background:`${tc}15`,color:tc,border:`1px solid ${tc}25`,fontWeight:700,whiteSpace:"nowrap"}}>{e.tipo}</span>
        <span style={{fontSize:9,padding:"3px 9px",borderRadius:10,background:sc.bg,color:sc.c,border:`1px solid ${sc.bd}`,fontWeight:700,whiteSpace:"nowrap"}}>{sc.emoji} {sc.label}</span>
        <span style={{color:"#1E3A5F",fontSize:9,transform:isOpen?"rotate(180deg)":"none",transition:"0.2s"}}>▼</span>
      </div>
      {isOpen&&(
        <div style={{padding:"0 14px 14px",borderTop:"1px solid #ffffff06"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"10px 0 8px"}}>
            <div style={{padding:"10px 12px",background:"#ffffff04",borderRadius:8,border:"1px solid #ffffff08"}}>
              <div style={{fontSize:9,letterSpacing:2,color:"#334155",fontWeight:700,marginBottom:4,textTransform:"uppercase"}}>Evidência</div>
              <p style={{fontSize:11,color:"#64748B",lineHeight:1.5,margin:0}}>{e.evidencia}</p>
              <div style={{fontSize:11,color:"#FBBF24",marginTop:6}}>👤 {e.decisor}</div>
            </div>
            <div style={{padding:"10px 12px",background:"#10B98108",borderRadius:8,border:"1px solid #10B98118"}}>
              <div style={{fontSize:9,letterSpacing:2,color:"#10B981",fontWeight:700,marginBottom:4,textTransform:"uppercase"}}>Como revender</div>
              <p style={{fontSize:11,color:"#94A3B8",lineHeight:1.5,margin:0}}>{e.comoRevender}</p>
            </div>
          </div>
          <textarea value={txt} onChange={ev=>onEdit(ev.target.value)} onBlur={onSave}
            placeholder="Anotação..." rows={2}
            style={{width:"100%",padding:"7px 10px",borderRadius:7,border:"1px solid #1a2a40",
              background:"#0a1628",color:"#C8D6E8",fontSize:11,resize:"vertical",outline:"none",
              fontFamily:"inherit",marginBottom:8,boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            <a href={e.linkedin} target="_blank" rel="noopener noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:6,
                background:"#0A66C212",border:"1px solid #0A66C228",color:"#60A5FA",fontSize:9,fontWeight:700,textDecoration:"none"}}>
              🔗 LinkedIn
            </a>
            {Object.entries(STATUS).map(([k,s])=>(
              <button key={k} onClick={()=>onStatus(k)} disabled={status===k}
                style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${s.bd}`,
                  background:status===k?s.bg:"transparent",color:status===k?s.c:"#334155",
                  fontSize:9,fontWeight:700,cursor:status===k?"default":"pointer",opacity:status===k?1:0.65}}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
