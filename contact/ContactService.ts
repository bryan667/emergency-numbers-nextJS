import ContactModel, { Contacts } from './ContactModel';

export default class ContactService {
  private caseInsensitiveRegexMatch = (field: string) => {
    let query = { $regex: field ?? '', $options: 'i' };
    return query;
  };

  async getAllPossibleContacts(inputs: {
    city: string | null;
    state: string | null;
    region: string | null;
  }) {
    try {
      const queryConditions = [
        {
          scope: 'country',
          country: this.caseInsensitiveRegexMatch('Philippines'),
        },
      ];

      for (const [key, value] of Object.entries(inputs)) {
        if (value) {
          queryConditions.push({
            scope: key,
            [key]: this.caseInsensitiveRegexMatch(value),
            country: this.caseInsensitiveRegexMatch('Philippines'),
          });
        }
      }

      const results: Contacts[] = await ContactModel.find({
        $or: queryConditions,
      }).exec();

      const scopeOrder = ['city', 'state', 'region', 'country'];
      results.sort(
        (a, b) => scopeOrder.indexOf(a.scope) - scopeOrder.indexOf(b.scope),
      );

      return results;
    } catch (e) {
      throw new Error('failed to get all possible contacts');
    }
  }
}
