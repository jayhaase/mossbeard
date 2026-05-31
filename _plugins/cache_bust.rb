# Content-hash cache busting for CSS/JS (same API as jekyll-cache-bust's bust_file_cache).
# The published jekyll-cache-bust 0.0.1 gem only resolves paths under assets/.

require 'digest/md5'

module Jekyll
  module CacheBustFilter
    def bust_file_cache(path)
      site = @context.registers[:site]
      source = path.to_s.sub(%r{\A/}, '')
      full = File.join(site.source, source)
      raise Jekyll::Errors::FileNotFound, path unless File.file?(full)

      digest = Digest::MD5.file(full).hexdigest
      "#{path}?v=#{digest}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBustFilter)
