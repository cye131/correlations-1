<?php

/* updatehistcorrel.html */
class __TwigTemplate_bf26b55b0cf4d5a89835611b47e2e439983c7691db325f713eba15439bdfd816 extends Twig_Template
{
    private $source;

    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        // line 1
        $this->parent = $this->loadTemplate("layout.html", "updatehistcorrel.html", 1);
        $this->blocks = array(
            'staticlinks' => array($this, 'block_staticlinks'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "layout.html";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_staticlinks($context, array $blocks = array())
    {
    }

    // line 6
    public function block_content($context, array $blocks = array())
    {
        // line 7
        echo "
    <section class=\"container\">
    </section>
    
    <section class=\"container\" style=\"margin-bottom:20px\">
        <form class=\"form-inline\">
            <div class = \"form-group\">
                <label for=\"category\" >Category:</label>
                <input type=\"text\" class=\"form-control form-control-sm\" id=\"category\" value=\"\" placeholder=\"e.g., reg\">
                <button class=\"btn btn-primary btn-sm\" type=\"button\" id=\"update\">Update</button>
                <div id=\"errormessage\" class=\"invalid-feedback\">Error Message!</div>
            </div>
        </form>        
    </section>
    
    <section class=\"container\">
        <div class=\"container\" id=\"info\">
        </div>
    </section>

    <script>
        
        
        \$(\"#update\").click(function(){
            var category = \$(\"#category\").val();
            console.log(category);
                    
            console.log(tagsCorrel);
            calcCorrel(0);

        });

        function calcCorrel(i) {    
            \$.ajax({
                url: '/test/update_hist_correl.ajax.php',
                type: 'POST',
                data: {ajax: tagsCorrel[i]},
                dataType: 'html',
                cache: false,
                timeout: 10000,
                success: function(results){
                    console.log(\"Success\");
                    console.log(results);
                    results = JSON.parse(results);
                    console.log(results);
                    if (results.info.insertedHistData === true) {
                        \$(\"#info\").append('<br><span>Successfully updated #' + i  + ': ' + tagsCorrel[i].s_corr_nid + '(' + tagsCorrel[i].freq + ') with ' + results.info.rowsChg + ' rows (' + results.info.firstDate + ' to ' + results.info.lastDate + ')</span>');
                    }
                    else {
                        \$(\"#info\").append('<br><span><b>Failed</b> to update #' + i  + ': ' + tagsCorrel[i].s_corr_nid +  ' | ' + results.info.errorMsg + '</span>');
                    }
                    
                    \$(\"#info\").append(' <a href=\"' + results.info.url + '\">URL</a>');
                    i ++;
                    if (i<tagsCorrel.length) calcCorrel(i);
                },
                error:function(e, ts, et){
                        \$(\"#info\").append('<br><span style=\"font-weight:bold\">AJAX ERROR ON #' + i  + ': ' + tagsCorrel[i].s_corr_nid +  ' | ' + ts +  ' (s_corr_id: ' + tagsCorrel[i].s_corr_id +  ')</span>');
                        i ++;
                        if (i<tagsCorrel.length) calcCorrel(i);
                }
            });
        }

    </script>
    
";
    }

    public function getTemplateName()
    {
        return "updatehistcorrel.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  41 => 7,  38 => 6,  33 => 3,  15 => 1,);
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% extends \"layout.html\" %}

{% block staticlinks %}
{% endblock %}

{% block content %}

    <section class=\"container\">
    </section>
    
    <section class=\"container\" style=\"margin-bottom:20px\">
        <form class=\"form-inline\">
            <div class = \"form-group\">
                <label for=\"category\" >Category:</label>
                <input type=\"text\" class=\"form-control form-control-sm\" id=\"category\" value=\"\" placeholder=\"e.g., reg\">
                <button class=\"btn btn-primary btn-sm\" type=\"button\" id=\"update\">Update</button>
                <div id=\"errormessage\" class=\"invalid-feedback\">Error Message!</div>
            </div>
        </form>        
    </section>
    
    <section class=\"container\">
        <div class=\"container\" id=\"info\">
        </div>
    </section>

    <script>
        
        
        \$(\"#update\").click(function(){
            var category = \$(\"#category\").val();
            console.log(category);
                    
            console.log(tagsCorrel);
            calcCorrel(0);

        });

        function calcCorrel(i) {    
            \$.ajax({
                url: '/test/update_hist_correl.ajax.php',
                type: 'POST',
                data: {ajax: tagsCorrel[i]},
                dataType: 'html',
                cache: false,
                timeout: 10000,
                success: function(results){
                    console.log(\"Success\");
                    console.log(results);
                    results = JSON.parse(results);
                    console.log(results);
                    if (results.info.insertedHistData === true) {
                        \$(\"#info\").append('<br><span>Successfully updated #' + i  + ': ' + tagsCorrel[i].s_corr_nid + '(' + tagsCorrel[i].freq + ') with ' + results.info.rowsChg + ' rows (' + results.info.firstDate + ' to ' + results.info.lastDate + ')</span>');
                    }
                    else {
                        \$(\"#info\").append('<br><span><b>Failed</b> to update #' + i  + ': ' + tagsCorrel[i].s_corr_nid +  ' | ' + results.info.errorMsg + '</span>');
                    }
                    
                    \$(\"#info\").append(' <a href=\"' + results.info.url + '\">URL</a>');
                    i ++;
                    if (i<tagsCorrel.length) calcCorrel(i);
                },
                error:function(e, ts, et){
                        \$(\"#info\").append('<br><span style=\"font-weight:bold\">AJAX ERROR ON #' + i  + ': ' + tagsCorrel[i].s_corr_nid +  ' | ' + ts +  ' (s_corr_id: ' + tagsCorrel[i].s_corr_id +  ')</span>');
                        i ++;
                        if (i<tagsCorrel.length) calcCorrel(i);
                }
            });
        }

    </script>
    
{% endblock %}", "updatehistcorrel.html", "/var/www/correlation/public_html/templates/updatehistcorrel.html");
    }
}