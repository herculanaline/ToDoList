import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';

export default function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('minhasTarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [
      { id: 1, texto: 'Preparar ambiente', concluida: false },
      { id: 2, texto: 'Criar vite', concluida: false }
    ];
  });
  
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      setTarefas([...tarefas, { 
        id: Date.now(), 
        texto: novaTarefa, 
        concluida: false 
      }]);
      setNovaTarefa('');
    }
  };

  const toggleTarefa = (id) => {
    setTarefas(tarefas.map(t => 
      t.id === id ? { ...t, concluida: !t.concluida } : t
    ));
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  const limparTudo = () => {
    if (window.confirm('Deseja realmente limpar todas as tarefas?')) {
      setTarefas([]);
      localStorage.removeItem('minhasTarefas');
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        
        {/* Header */}
        <header className="bg-white rounded shadow-sm p-4 mb-4">
          <h1 className="text-primary fw-bold mb-2">
            To Do List
          </h1>
          <p className="text-muted mb-0">Sistema de gerenciamento de tarefas</p>
        </header>

        <div className="row justify-content-center">
          
          {/* Lista de Tarefas */}
          <div className="col-lg-8 col-xl-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="card-title h4 mb-0 d-flex align-items-center gap-2">
                    <CheckCircle className="text-success" size={28} />
                    Lista de Tarefas
                  </h2>
                  {tarefas.length > 0 && (
                    <button
                      onClick={limparTudo}
                      className="btn btn-link btn-sm text-danger text-decoration-none"
                    >
                      Limpar tudo
                    </button>
                  )}
                </div>
                
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && adicionarTarefa()}
                    placeholder="Nova tarefa..."
                  />
                  <button
                    onClick={adicionarTarefa}
                    className="btn btn-primary d-flex align-items-center gap-2"
                  >
                    <Plus size={20} />
                    Adicionar
                  </button>
                </div>

                <div className="list-group mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {tarefas.map(tarefa => (
                    <div
                      key={tarefa.id}
                      className="list-group-item d-flex align-items-center gap-3"
                    >
                      <button
                        onClick={() => toggleTarefa(tarefa.id)}
                        className="btn btn-link p-0 border-0"
                        style={{ minWidth: '24px' }}
                      >
                        {tarefa.concluida ? (
                          <CheckCircle className="text-success" size={24} />
                        ) : (
                          <Circle className="text-secondary" size={24} />
                        )}
                      </button>
                      
                      <span 
                        className="flex-grow-1"
                        style={{ 
                          textDecoration: tarefa.concluida ? 'line-through' : 'none',
                          color: tarefa.concluida ? '#6c757d' : '#212529'
                        }}
                      >
                        {tarefa.texto}
                      </span>
                      
                      <button
                        onClick={() => removerTarefa(tarefa.id)}
                        className="btn btn-link text-danger p-0 border-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {tarefas.length === 0 && (
                  <div className="text-center text-muted py-4">
                    Nenhuma tarefa adicionada ainda
                  </div>
                )}

                <div className="border-top pt-3">
                  <small className="text-muted">
                    Total: <strong>{tarefas.length}</strong> tarefas | 
                    Concluídas: <strong>{tarefas.filter(t => t.concluida).length}</strong>
                  </small>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer com Contato */}
        <footer className="mt-5 pt-4 border-top">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5 className="fw-bold text-primary">To Do List</h5>
              <p className="text-muted small">Sistema de gerenciamento de tarefas e atividades práticas</p>
            </div>
            
            <div className="col-md-4 mb-3">
              <h6 className="fw-bold mb-3">Contato</h6>
              <ul className="list-unstyled text-muted small">
                <li className="mb-2">📧 herculanaline@gmail.com</li>
                <li className="mb-2">📱 (85) 98888-XXXX</li>
                <li className="mb-2">📍 Fortaleza, CE</li>
              </ul>
            </div>
            
            <div className="col-md-4 mb-3">
              <h6 className="fw-bold mb-3">Redes Sociais</h6>
              <div className="d-flex gap-2">
                <a href="#" className="btn btn-outline-primary btn-sm">GitHub</a>
                <a href="#" className="btn btn-outline-primary btn-sm">LinkedIn</a>
                <a href="#" className="btn btn-outline-primary btn-sm">Instagram</a>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-3 border-top">
            <small className="text-muted">
              © 2025 Plataforma Web - Atividade Prática | Dados salvos automaticamente
            </small>
          </div>
        </footer>
      </div>
    </div>
  );
}