jobSteps = this.response.jobMonitoringDTO.job; // array de steps do backend

// Converte nomes de exibição para stepName do backend
labelToStepName(label: string): string {
  const map: { [key: string]: string } = {
    Storage: 'STORE_AUDIO',
    Check: 'CHECK_AUDIO',
    Speech: 'CHECK_SPEECH',
    Tex: 'EXTRACT_TEXTO'
  };
  return map[label] || '';
}

// Verifica se o step está completo
isCompleted(label: string): boolean {
  const stepName = this.labelToStepName(label);
  return this.jobSteps.some(
    (step) => step.stepName === stepName && step.stepStatus === 'COMPLETED'
  );
}
