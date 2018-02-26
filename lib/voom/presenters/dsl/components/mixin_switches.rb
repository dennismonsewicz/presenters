require_relative 'mixin_append'

module Voom
  module Presenters
    module DSL
      module Components
        module MixinSwitches
          include MixinAppend

          def checkbox(**attribs, &block)
            self << Checkbox.new(parent: self, **attribs, &block)
          end

          def radio_button(**attribs, &block)
            self << RadioButton.new(parent: self,
                                    context: context,
                                    **attribs, &block)
          end

          def switch(**attribs, &block)
            self << Switch.new(parent: self,
                               context: context,
                               **attribs, &block)
          end

          def icon_toggle(icon, **attribs, &block)
            self << IconToggle.new(parent: self, icon: icon,
                                   context: context,
                                   **attribs, &block)
          end
        end
      end
    end
  end
end