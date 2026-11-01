# Cloud Engineer Academy

Plataforma estática, em português, para acompanhar uma formação prática de Cloud Engineering do nível iniciante ao avançado. O projeto combina matriz curricular estruturada em TypeScript, navegação interativa, persistência local e preparação de deploy no GitHub Pages.

## Currículo

A matriz tem **22 módulos e aproximadamente 626 horas**. Os módulos foram organizados por dependência de conhecimentos, com uma cloud principal (AWS) aprofundada antes de multicloud. Segurança, custo, documentação e troubleshooting aparecem desde os primeiros labs e voltam nos projetos avançados. O tempo é uma estimativa de estudo, não prazo de empregabilidade.

| # | Módulo | h | Etapa |
|---:|---|---:|---|
| 1 | Fundamentos de TI e computação | 18 | Fundamentos |
| 2 | Redes de computadores e protocolos | 32 | Fundamentos |
| 3 | Linux e administração de sistemas | 34 | Fundamentos |
| 4 | Windows, virtualização e infraestrutura híbrida | 24 | Fundamentos |
| 5 | Git, GitHub e ferramentas de desenvolvimento | 18 | Fundamentos |
| 6 | Programação aplicada: Python, Bash e PowerShell | 42 | Fundamentos |
| 7 | Fundamentos de Cloud Computing | 16 | Fundamentos |
| 8 | AWS: fundamentos e serviços essenciais | 36 | Intermediário |
| 9 | AWS: implementação, redes e operações | 40 | Intermediário |
| 10 | Containers, Docker e Kubernetes | 38 | Intermediário |
| 11 | Terraform e Infrastructure as Code | 32 | Intermediário |
| 12 | DevOps, CI/CD e GitOps | 30 | Intermediário |
| 13 | Cloud Networking avançado | 30 | Avançado |
| 14 | Arquitetura de soluções Cloud | 28 | Avançado |
| 15 | Cloud Security e DevSecOps | 34 | Avançado |
| 16 | Observabilidade, monitoramento e SRE | 28 | Avançado |
| 17 | Bancos de dados, armazenamento e sistemas distribuídos | 24 | Avançado |
| 18 | Serverless, APIs e desenvolvimento Cloud | 26 | Intermediário |
| 19 | Azure, Google Cloud e fundamentos multicloud | 24 | Avançado |
| 20 | FinOps, governança e infraestrutura corporativa | 22 | Avançado |
| 21 | Fundamentos de IA e infraestrutura para workloads de IA | 18 | Avançado |
| 22 | Projetos profissionais, certificações e preparação para o mercado | 32 | Avançado |

Cada módulo contém pré-requisitos, objetivo profissional, competências, três aulas com materiais clicáveis, estimativas, prática guiada, exercícios de revisão, projeto, entregáveis, critérios verificáveis e certificações relacionadas. A distribuição estimada reserva cerca de 30% para estudo guiado e 70% para laboratórios, exercícios e projetos. `src/curriculum.ts` é a fonte estruturada usada pela aplicação.

### Base da pesquisa e decisões

- A trilha combina fundamentos recorrentes em certificações de função (AWS, Azure, Google Cloud, Kubernetes e Terraform) com capacidades de suporte, engenharia, DevOps, segurança e arquitetura.
- A CNCF/LF Research observou Kubernetes em produção em 82% dos usuários de containers pesquisados em 2025; isso apoia a inclusão de containers/Kubernetes, mas não implica que Kubernetes seja requisito para todo cargo inicial. [CNCF Annual Cloud Native Survey](https://www.cncf.io/reports/the-cncf-annual-cloud-native-survey/)
- A AWS descreve a certificação Solutions Architect Associate em torno de desenho de sistemas distribuídos e mantém guias de exame por função; Microsoft Learn descreve AZ-104 em identidade, rede, armazenamento, compute, governança e monitoramento; HashiCorp descreve Terraform Associate 004 em IaC, workflow, estado e módulos. Essas grades servem como referências públicas de competências, não como substituto de prática. [AWS exam guides](https://docs.aws.amazon.com/aws-certification/latest/examguides/), [AZ-104](https://learn.microsoft.com/credentials/certifications/exams/az-104), [Terraform Associate 004](https://developer.hashicorp.com/certifications/terraform-associate)
- A ordem e o peso são uma síntese pedagógica, não uma previsão estatística de vagas no Brasil. O conteúdo de certificações pode mudar; confira o exame vigente antes de pagar. A matriz não recomenda a extinta AWS Database Specialty.

## Recursos e custo

Os cartões mostram idioma, acesso e motivo da recomendação. A prioridade foi documentação e ensino oficial/gratuito. Alguns caminhos são freemium; exames de certificação são pagos. Conta de cloud, créditos, labs hosted, região e serviços integrados podem gerar custos mesmo quando o material didático é gratuito. Consulte a observação de custo do cartão, configure budget/alertas e destrua recursos de teste. Use VM local, Packet Tracer, Docker, Minikube/kind ou labs locais sempre que possível.

Fontes selecionadas incluem Cisco Networking Academy/Packet Tracer; Linux Foundation e Linux Journey via LabEx; Git e GitHub Skills; Python e PowerShell oficiais; AWS Skill Builder, workshops, Well-Architected e pricing; Microsoft Learn; Google Cloud training; HashiCorp Developer; Docker Docs; Kubernetes Docs; OWASP; PortSwigger; Prometheus; Grafana; Google SRE books; e FinOps Foundation.

## Funcionalidades

- Dashboard com avanço de aulas, módulos dominados, horas registradas, XP e áreas de competência.
- Mapa visual com recomendações de pré-requisitos; qualquer módulo continua acessível para consulta.
- Páginas de módulo e aula com materiais externos, laboratório, exercícios, projeto e critérios de domínio.
- Progresso em `localStorage`, mantido ao recarregar o navegador.
- Planejador com disponibilidade semanal, projeção aproximada e divisão sugerida 70/30.
- Portfólio com URL opcional de repositório HTTPS por projeto.
- Pesquisa e filtros por módulo/tecnologia, nível e situação.
- Backup/restauração JSON com validação de versão e IDs.
- XP, níveis e marcos associados a aulas, módulos e projetos concluídos.

## Desenvolvimento local

Requer Node.js 22+ e pnpm 11 (o lockfile foi gerado com pnpm 11.25.0).

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Testes e build

```bash
pnpm test
pnpm build
pnpm preview
```

Os testes cobrem as regras de conclusão, percentuais/XP e validação de backup. A suíte não substitui testes manuais de teclado, navegação móvel e fluxo de publicação.

## Publicar no GitHub Pages

1. Suba esta pasta para a raiz de um repositório GitHub e use a branch `main`.
2. Em **Settings → Pages**, selecione **GitHub Actions** como origem.
3. O workflow `.github/workflows/deploy.yml` executa testes, build e publicação quando há push em `main` (ou manualmente pela aba Actions).
4. O Vite usa `base: './'` para permitir hospedagem em `https://<usuario>.github.io/<repositorio>/` sem editar o caminho do projeto.

Não há backend, chave privada ou serviço pago obrigatório. O estado não sincroniza entre dispositivos: exporte o JSON para backup. Não inclua dados sensíveis ou credenciais no portfólio.

## Estrutura

```text
src/
  curriculum.ts       # matriz e recursos curados
  main.tsx            # navegação e telas
  progressModel.ts    # regras de conclusão e pontuação
  progressModel.test.ts
  storage.ts          # persistência e validação de backup
  types.ts
  styles.css
.github/workflows/deploy.yml
```

