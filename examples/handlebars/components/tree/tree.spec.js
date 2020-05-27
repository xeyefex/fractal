const fractal = require('../../fractal.config.js');

describe('tree', () => {
    beforeEach(async () => {
        await fractal.load();
    });

    it('properly loads components', () => {
        expect(fractal.components.find('@tree-leaf')).toBeDefined();
        expect(fractal.components.find('@subtree-leaf')).toBeDefined();
    });

    it('properly loads variants from files', () => {
        expect(fractal.components.find('@tree-leaf--variant')).toBeDefined();
        expect(fractal.components.find('@subtree-leaf--variant')).toBeDefined();
    });

    it('properly loads variants from config', () => {
        expect(fractal.components.find('@tree-leaf--another')).toBeDefined();
    });

    it('inherits context from parent', () => {
        expect(fractal.components.find('@tree-leaf').context.level).toBe(1);
    });

    it('overrides context from parent', () => {
        expect(fractal.components.find('@tree-leaf--another').context.level).toBe(2);
    });

    it('overrides context from parent and pass it further down', () => {
        expect(fractal.components.find('@subtree-leaf').context.level).toBe(2);
    });
});
