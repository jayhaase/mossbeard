# Liquid 4.x calls tainted? which was removed in Ruby 3.2.
# This restores it as a harmless no-op so Jekyll works with modern Ruby.
unless Object.method_defined?(:tainted?)
  module RubyCompatTaint
    def tainted? = false
    def taint    = self
  end
  Object.prepend(RubyCompatTaint)
end
