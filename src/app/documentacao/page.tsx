import Image from "next/image";

export default function Documentacao(){
    return (
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-teal-500 mb-6">🎓 Gestão de Matriz - Guia do Usuário</h1>
            <p className="text-lg text-gray-700 mb-4">
              Bem-vindo à aplicação de Gestão de Matriz! Este guia irá ajudá-lo a usar o site para simular a escolha de disciplinas e gerar uma tabela de horários personalizada.
            </p>
    
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">🚶‍♂️ Passo a Passo para Utilizar a Aplicação</h2>
    
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Configure as disciplinas que já cursou</h3>
            <ul className="list-disc pl-6 text-lg text-gray-700">
              <li>Entre na rota de configuração.</li>
              <li>Aqui você poderá visualizar todas as disciplinas da matriz curricular separadas por semestre.</li>
              <li>Clique em cima das disciplinas que você já cursou.</li>
            </ul>
    
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Simule seu pedido de matrícula</h3>
            <ul className="list-disc pl-6 text-lg text-gray-700">
              <li>Entre na rota de simulação.</li>
              <li>Na direita da página há uma lista com todas as disciplinas que você pode cursar e seus respectivos horários.</li>
              <li>Clique nas disciplinas que você pretende cursar e ele será adicionado na tabela de horários.</li>
            </ul>
    
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Visão Geral</h3>
            <ul className="list-disc pl-6 text-lg text-gray-700">
              <li>Após configurar as disciplinas que você já cursou, entre na rota Visão Geral.</li>
              <li>Nessa página, você verá três gráficos que mostram seu desempenho no curso e o quanto falta para completar.</li>
            </ul>
    
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">🛠️ Funcionalidades</h2>
            <ul className="list-disc pl-6 text-lg text-gray-700">
              <li><strong>Escolha de disciplinas e horários:</strong> Selecione disciplinas e aloque seus horários.</li>
              <li><strong>Detecção de conflitos de horários:</strong> Receba alertas se houver sobreposição de horários.</li>
              <li><strong>Simulação visual de horários:</strong> Veja as disciplinas organizadas em uma tabela semanal.</li>
              <li><strong>Salvamento automático:</strong> Suas escolhas são salvas no navegador automaticamente.</li>
              <li><strong>Geração de PDF:</strong> Exporte seu horário para PDF e compartilhe com colegas ou professores.</li>
            </ul>            

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">🙏 Agradecimentos</h2>
            <p className="text-lg text-gray-700 mb-4">Agradeço a todos que contribuíram para o desenvolvimento desta aplicação, especialmente:</p>
            <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
              <li>José Lisboa dos Santos Neto</li>
              <li>Luan Silva Mascarenhas</li>
            </ul>
            <p className="text-lg text-gray-700 mb-4">
              Lembrando que essa aplicação é feita de estudantes para estudantes. Se você encontrar algum problema ou tiver dúvidas, entre em contato: 
              <a href="mailto:victor.mendes07@aluno.ifce.edu.br" className="text-teal-600 hover:underline"> victor.mendes07@aluno.ifce.edu.br</a>
            </p>
            <p className="text-lg text-gray-700">
              <strong>As disciplinas cadastradas são somente do curso de Ciência da Computação, IFCE - Campus Maracanaú</strong> (Última atualização de disciplinas: 2024.2).
            </p>
          </div>
        </div>
      );
}