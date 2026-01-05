import { supabase } from './supabaseClient';

export const dataService = {
  // Récupérer toutes les catégories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Récupérer les tâches d'une catégorie spécifique
  async getTasksByCategory(categoryId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .where('category_id', 'eq', categoryId);

    if (error) throw error;
    return data;
  }
};