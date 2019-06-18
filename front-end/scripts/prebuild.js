#!/usr/bin/env node
import { generateEnvFromEnvSys } from '@sicoob/ngenv';

/**
 * Modelo de template a ser gerada.
 * 
 * Dentro de <%= %>, informe a env a ser utilizada
 * 
 */
const templateLayout = `
  export const environment = {
    production: true,
    rest_url: '<%= BACKEND_URL %>',
    port: '<%= BACKEND_PORT %>',
    ourtoParam: '<%= OUTRO_PARAM %>',
  };
`;

/**
 * Para criar outros valores customizados caso necessário
 */
const envValues = {
   OUTRO_PARAM: 'OUTRO PARAMETRO DE TESTE 2'
};

/**
 * Nome do arquivo a ser criado
 */
const fileName = 'environment.ts';

generateEnvFromEnvSys(envValues, templateLayout, fileName);
process.exit(0);